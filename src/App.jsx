import { useState, useEffect, useCallback } from "react";

const MEAL_TYPES = ["早餐", "午餐", "晚餐", "點心"];
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const TABS = ["日記", "週總結", "月總結"];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfWeek(year, month) { return new Date(year, month, 1).getDay(); }
function toKey(year, month, day) {
  return `protein:${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function todayInfo() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
}

// localStorage helpers
const storage = {
  get: (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
};

async function analyzeProtein(foodDesc) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `你是一位保守的營養分析師。使用者會輸入他們吃的食物描述（可能有錯別字或簡寫），你要：
1. 判斷最有可能的食物是什麼
2. 給出保守的蛋白質估算（以台灣常見份量為基準）
3. 只回傳 JSON，格式如下，不要有任何其他文字：
{"food": "判斷出的食物名稱", "protein_g": 數字, "reason": "簡短說明（20字內）"}
注意：保守估算，寧可低估不要高估。`,
      messages: [{ role: "user", content: foodDesc }],
    }),
  });
  const data = await res.json();
  const text = data.content?.find((c) => c.type === "text")?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

const S = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  },
};

function GoalBar({ goal, total }) {
  const pct = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;
  const color = pct >= 100 ? "#a8e6a3" : pct >= 70 ? "#f0c060" : "#ff8080";
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
        <span>0g</span><span>目標 {goal}g</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function MealRow({ meal, onUpdate, onDelete, index }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!meal.food.trim()) { setError("請先填寫食物描述"); return; }
    setError(""); setAnalyzing(true);
    try {
      const result = await analyzeProtein(meal.food);
      onUpdate(index, { ...meal, protein: String(result.protein_g), analyzed: result.food, reason: result.reason });
    } catch { setError("分析失敗，請稍後再試"); }
    setAnalyzing(false);
  };

  const handleConfirm = () => {
    if (!meal.food.trim()) { setError("請先填寫食物描述"); return; }
    if (!meal.protein) { setError("請填寫蛋白質克數，或使用系統分析"); return; }
    setError("");
    onUpdate(index, { ...meal, confirmed: true });
  };

  if (meal.confirmed) {
    return (
      <div style={{
        ...S.card, marginBottom: 10, padding: "12px 16px",
        borderColor: "rgba(168,230,163,0.2)",
        background: "rgba(168,230,163,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 11, color: "#a8e6a3", background: "rgba(168,230,163,0.15)", padding: "1px 7px", borderRadius: 8 }}>{meal.type}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{meal.food}</span>
          </div>
          {meal.analyzed && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>判讀：{meal.analyzed}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#a8e6a3" }}>{meal.protein}g</span>
          <button onClick={() => onUpdate(index, { ...meal, confirmed: false })} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.45)", borderRadius: 6, padding: "4px 8px",
            cursor: "pointer", fontSize: 11, fontFamily: "inherit",
          }}>編輯</button>
          <button onClick={() => onDelete(index)} style={{ background: "none", border: "none", color: "rgba(255,100,100,0.5)", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...S.card, marginBottom: 10, padding: "14px 16px", position: "relative" }}>
      <button onClick={() => onDelete(index)} style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 18 }}>×</button>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {MEAL_TYPES.map(t => (
          <button key={t} onClick={() => onUpdate(index, { ...meal, type: t })} style={{
            padding: "4px 10px", borderRadius: 20, border: "1px solid", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
            borderColor: meal.type === t ? "#a8e6a3" : "rgba(255,255,255,0.2)",
            background: meal.type === t ? "rgba(168,230,163,0.2)" : "transparent",
            color: meal.type === t ? "#a8e6a3" : "rgba(255,255,255,0.5)",
          }}>{t}</button>
        ))}
      </div>
      <input placeholder="食物描述（必填）*" value={meal.food}
        onChange={e => onUpdate(index, { ...meal, food: e.target.value, analyzed: "", reason: "" })}
        style={{ ...S.input, width: "100%", marginBottom: 8 }} />
      {meal.analyzed && (
        <div style={{ fontSize: 11, color: "#a8e6a3", marginBottom: 6, marginTop: -4 }}>
          ✓ 判讀為：{meal.analyzed}　{meal.reason}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <input placeholder="蛋白質 g（選填）" value={meal.protein} type="number" min="0"
          onChange={e => onUpdate(index, { ...meal, protein: e.target.value })}
          style={{ ...S.input, flex: 1, color: "#a8e6a3" }} />
        <button onClick={handleAnalyze} disabled={analyzing} style={{
          background: analyzing ? "rgba(168,230,163,0.1)" : "rgba(168,230,163,0.2)",
          border: "1px solid rgba(168,230,163,0.4)", color: "#a8e6a3", borderRadius: 8,
          padding: "8px 12px", cursor: analyzing ? "not-allowed" : "pointer", fontSize: 12,
          fontFamily: "inherit", whiteSpace: "nowrap",
        }}>{analyzing ? "分析中..." : "🤖 系統分析"}</button>
      </div>
      {error && <div style={{ color: "#ff6b6b", fontSize: 12, marginBottom: 8 }}>{error}</div>}
      <button onClick={handleConfirm} style={{
        width: "100%", padding: "10px",
        background: "rgba(168,230,163,0.25)", border: "1px solid rgba(168,230,163,0.5)",
        borderRadius: 10, color: "#a8e6a3", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit",
      }}>✓ 確認</button>
    </div>
  );
}

function GoalSettings({ goal, onSave }) {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(String(goal.min));
  const [max, setMax] = useState(String(goal.max));
  useEffect(() => { setMin(String(goal.min)); setMax(String(goal.max)); }, [goal]);
  const save = () => {
    const mn = parseInt(min), mx = parseInt(max);
    if (!isNaN(mn) && !isNaN(mx) && mn > 0 && mx >= mn) { onSave({ min: mn, max: mx }); setOpen(false); }
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
        color: "rgba(255,255,255,0.5)", fontSize: 12, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit",
      }}>⚙️ 每日目標：{goal.min}–{goal.max}g</button>
      {open && (
        <div style={{ ...S.card, marginTop: 8, marginBottom: 0 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>設定每日蛋白質目標（g）</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={min} onChange={e => setMin(e.target.value)} type="number" min="1" placeholder="最低"
              style={{ ...S.input, width: 80, textAlign: "center" }} />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
            <input value={max} onChange={e => setMax(e.target.value)} type="number" min="1" placeholder="最高"
              style={{ ...S.input, width: 80, textAlign: "center" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>g / 天</span>
            <button onClick={save} style={{
              marginLeft: "auto", background: "rgba(168,230,163,0.2)", border: "1px solid rgba(168,230,163,0.4)",
              color: "#a8e6a3", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit",
            }}>儲存</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DayModal({ viewYear, viewMonth, day, dayData, setDayData, goal, today, onClose }) {
  const currentKey = toKey(viewYear, viewMonth, day);
  const meals = dayData[currentKey] || [];
  const totalProtein = meals.filter(m => m.confirmed !== false).reduce((sum, m) => sum + (parseFloat(m.protein) || 0), 0);
  const isTodayDay = day === today.day && viewMonth === today.month && viewYear === today.year;

  const saveMeals = (newMeals) => {
    const updated = { ...dayData, [currentKey]: newMeals };
    setDayData(updated);
    storage.set(currentKey, newMeals);
  };
  const addMeal = () => saveMeals([...meals, { type: "早餐", food: "", protein: "", analyzed: "", reason: "" }]);
  const updateMeal = (i, m) => { const u = [...meals]; u[i] = m; saveMeals(u); };
  const deleteMeal = (i) => saveMeals(meals.filter((_, idx) => idx !== i));

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.65)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(80px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .meal-scroll::-webkit-scrollbar { width: 4px; }
        .meal-scroll::-webkit-scrollbar-track { background: transparent; }
        .meal-scroll::-webkit-scrollbar-thumb { background: rgba(168,230,163,0.2); border-radius: 2px; }
      `}</style>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 480,
        background: "#131f13",
        border: "1px solid rgba(168,230,163,0.15)",
        borderTop: "2px solid rgba(168,230,163,0.3)",
        borderRadius: "20px 20px 0 0",
        maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        animation: "slideUp 0.22s cubic-bezier(0.32,0.72,0,1)",
      }}>
        <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, margin: "0 auto 16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 22 }}>{viewMonth + 1} 月 {day} 日</span>
                {isTodayDay && <span style={{ fontSize: 11, color: "#a8e6a3", background: "rgba(168,230,163,0.15)", padding: "2px 8px", borderRadius: 10 }}>今天</span>}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                {["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][new Date(viewYear, viewMonth, day).getDay()]}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>今日總計</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: totalProtein >= goal.min ? "#a8e6a3" : totalProtein > 0 ? "#f0c060" : "rgba(255,255,255,0.25)" }}>
                  {totalProtein > 0 ? `${totalProtein}g` : "--"}
                </div>
              </div>
              <button onClick={onClose} style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)", borderRadius: "50%", width: 34, height: 34,
                cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>×</button>
            </div>
          </div>
          {totalProtein > 0 && <GoalBar goal={goal.max} total={totalProtein} />}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0 0" }} />
        </div>
        <div className="meal-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 20px 32px", WebkitOverflowScrolling: "touch" }}>
          {meals.map((m, i) => <MealRow key={i} meal={m} index={i} onUpdate={updateMeal} onDelete={deleteMeal} />)}
          <button onClick={addMeal} style={{
            width: "100%", padding: "13px", background: "transparent",
            border: "1px dashed rgba(168,230,163,0.3)", borderRadius: 12,
            color: "rgba(168,230,163,0.6)", cursor: "pointer", fontSize: 14, fontFamily: "inherit",
          }}>+ 新增一餐</button>
        </div>
      </div>
    </div>
  );
}

function WeeklySummary({ viewYear, viewMonth, dayData, goal }) {
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);
  const weeks = [];
  let week = [];
  for (let i = 0; i < firstDow; i++) week.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }

  const getDayTotal = (d) => {
    if (!d) return 0;
    const ms = dayData[toKey(viewYear, viewMonth, d)] || [];
    return ms.filter(m => m.confirmed !== false).reduce((s, m) => s + (parseFloat(m.protein) || 0), 0);
  };

  return (
    <div>
      {weeks.map((week, wi) => {
        const validDays = week.filter(d => d !== null);
        const recordedDays = validDays.filter(d => getDayTotal(d) > 0);
        const weekTotal = validDays.reduce((s, d) => s + getDayTotal(d), 0);
        const weekAvg = recordedDays.length > 0 ? Math.round(weekTotal / recordedDays.length) : 0;
        const goalDays = recordedDays.filter(d => getDayTotal(d) >= goal.min).length;
        return (
          <div key={wi} style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>第 {wi + 1} 週</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{validDays[0]}日 — {validDays[validDays.length - 1]}日</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>週總計</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#a8e6a3" }}>{weekTotal}g</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 12 }}>
              {week.map((d, di) => {
                const t = getDayTotal(d);
                const pct = d && goal.max > 0 ? Math.min((t / goal.max) * 100, 100) : 0;
                const color = t >= goal.min ? "#a8e6a3" : t > 0 ? "#f0c060" : "rgba(255,255,255,0.06)";
                return (
                  <div key={di} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{WEEKDAYS[di]}</div>
                    <div style={{ height: 40, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
                      <div style={{ width: "100%", height: `${pct}%`, background: color, minHeight: t > 0 ? 3 : 0 }} />
                    </div>
                    <div style={{ fontSize: 9, marginTop: 3, color: d ? (t >= goal.min ? "#a8e6a3" : t > 0 ? "#f0c060" : "rgba(255,255,255,0.2)") : "transparent" }}>
                      {d ? (t > 0 ? `${t}` : `${d}`) : ""}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "日均", value: weekAvg > 0 ? `${weekAvg}g` : "--", color: weekAvg >= goal.min ? "#a8e6a3" : "#f0c060" },
                { label: "達標天", value: recordedDays.length > 0 ? `${goalDays}/${recordedDays.length}` : "--", color: goalDays === recordedDays.length && recordedDays.length > 0 ? "#a8e6a3" : "#f0c060" },
                { label: "記錄天", value: `${recordedDays.length}/${validDays.length}`, color: "rgba(255,255,255,0.8)" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MonthlySummary({ viewYear, viewMonth, dayData, goal }) {
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const today = todayInfo();
  let totalProtein = 0, recordedDays = 0, goalDays = 0, bestDay = 0, bestProtein = 0;
  const dailyTotals = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const ms = dayData[toKey(viewYear, viewMonth, d)] || [];
    const t = ms.filter(m => m.confirmed !== false).reduce((s, m) => s + (parseFloat(m.protein) || 0), 0);
    dailyTotals.push({ day: d, total: t });
    if (t > 0) {
      totalProtein += t; recordedDays++;
      if (t >= goal.min) goalDays++;
      if (t > bestProtein) { bestProtein = t; bestDay = d; }
    }
  }
  const avgProtein = recordedDays > 0 ? Math.round(totalProtein / recordedDays) : 0;
  const goalRate = recordedDays > 0 ? Math.round((goalDays / recordedDays) * 100) : 0;
  const maxTotal = Math.max(...dailyTotals.map(d => d.total), goal.max, 1);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { label: "月總蛋白質", value: totalProtein > 0 ? `${totalProtein}g` : "--", color: "#a8e6a3" },
          { label: "日均攝取", value: avgProtein > 0 ? `${avgProtein}g` : "--", color: avgProtein >= goal.min ? "#a8e6a3" : "#f0c060" },
          { label: "達標天數", value: recordedDays > 0 ? `${goalDays}/${recordedDays}天` : "--", color: goalRate >= 80 ? "#a8e6a3" : "#f0c060" },
          { label: "達標率", value: recordedDays > 0 ? `${goalRate}%` : "--", color: goalRate >= 80 ? "#a8e6a3" : goalRate >= 50 ? "#f0c060" : "#ff8080" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ ...S.card, marginBottom: 0, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>
      {bestDay > 0 && (
        <div style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>本月最佳單日</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{viewMonth + 1}/{bestDay}</div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#a8e6a3" }}>{bestProtein}g 🏆</div>
        </div>
      )}
      <div style={S.card}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>每日蛋白質趨勢</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
          {dailyTotals.map(({ day, total }) => {
            const pct = (total / maxTotal) * 100;
            const isTodayDay = day === today.day && viewMonth === today.month && viewYear === today.year;
            return (
              <div key={day} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "100%", height: `${Math.max(pct, total > 0 ? 4 : 0)}%`,
                  background: isTodayDay ? "#fff" : total >= goal.min ? "#a8e6a3" : total > 0 ? "#f0c060" : "rgba(255,255,255,0.06)",
                  borderRadius: "2px 2px 0 0", minHeight: total > 0 ? 3 : 0,
                }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>1日</span>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{daysInMonth}日</span>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10 }}>
          <span style={{ color: "#a8e6a3" }}>■ 達標</span>
          <span style={{ color: "#f0c060" }}>■ 未達標</span>
          <span style={{ color: "#fff" }}>■ 今天</span>
        </div>
      </div>
    </div>
  );
}

export default function ProteinJournal() {
  const today = todayInfo();
  const [tab, setTab] = useState("日記");
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  const [modalDay, setModalDay] = useState(null);
  const [dayData, setDayData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [goal, setGoal] = useState({ min: 110, max: 120 });

  useEffect(() => {
    const saved = storage.get("protein:goal");
    if (saved) setGoal(saved);
  }, []);

  const saveGoal = (g) => {
    setGoal(g);
    storage.set("protein:goal", g);
  };

  const loadMonth = useCallback((year, month) => {
    const days = getDaysInMonth(year, month);
    const result = {};
    for (let d = 1; d <= days; d++) {
      const v = storage.get(toKey(year, month, d));
      if (v) result[toKey(year, month, d)] = v;
    }
    setDayData(result);
    setLoaded(true);
  }, []);

  useEffect(() => { setLoaded(false); loadMonth(viewYear, viewMonth); }, [viewYear, viewMonth]);

  const getDayTotal = (d) => {
    const ms = dayData[toKey(viewYear, viewMonth, d)] || [];
    return ms.filter(m => m.confirmed !== false).reduce((s, m) => s + (parseFloat(m.protein) || 0), 0);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else setViewMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const isToday = (d) => d === today.day && viewMonth === today.month && viewYear === today.year;

  return (
    <div style={{
      minHeight: "100vh", background: "#0f1a0f", color: "#e8f5e8",
      fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif", padding: "24px 16px",
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(40,80,40,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(20,60,30,0.3) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#a8e6a3", marginBottom: 4, textTransform: "uppercase" }}>Protein Journal</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#fff" }}>蛋白質日記</h1>
        </div>

        <GoalSettings goal={goal} onSave={saveGoal} />

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "9px 0", borderRadius: 10, border: "1px solid",
              borderColor: tab === t ? "#a8e6a3" : "rgba(255,255,255,0.1)",
              background: tab === t ? "rgba(168,230,163,0.15)" : "transparent",
              color: tab === t ? "#a8e6a3" : "rgba(255,255,255,0.4)",
              cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: tab === t ? 600 : 400,
            }}>{t}</button>
          ))}
        </div>

        <div style={{ ...S.card, marginBottom: 16, padding: "12px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={prevMonth} style={{ background: "none", border: "none", color: "#a8e6a3", fontSize: 22, cursor: "pointer" }}>‹</button>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{viewYear} 年 {viewMonth + 1} 月</span>
            <button onClick={nextMonth} style={{ background: "none", border: "none", color: "#a8e6a3", fontSize: 22, cursor: "pointer" }}>›</button>
          </div>
        </div>

        {tab === "日記" && (
          <div style={S.card}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>點選日期來記錄蛋白質攝取</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
              {WEEKDAYS.map(w => <div key={w} style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.35)", padding: "4px 0" }}>{w}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                const total = getDayTotal(d);
                return (
                  <button key={d} onClick={() => setModalDay(d)} style={{
                    aspectRatio: "1", borderRadius: 10, cursor: "pointer",
                    border: isToday(d) ? "2px solid rgba(168,230,163,0.5)" : "2px solid transparent",
                    background: isToday(d) ? "rgba(168,230,163,0.08)" : "rgba(255,255,255,0.03)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "4px 2px", transition: "all 0.12s",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: isToday(d) ? 700 : 400, color: isToday(d) ? "#c8f0c8" : "rgba(255,255,255,0.75)" }}>{d}</span>
                    {total > 0
                      ? <span style={{ fontSize: 9, color: total >= goal.min ? "#a8e6a3" : "#f0c060", marginTop: 1, lineHeight: 1 }}>{total}g</span>
                      : <span style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", marginTop: 1, lineHeight: 1 }}>+</span>
                    }
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {tab === "週總結" && (loaded ? <WeeklySummary viewYear={viewYear} viewMonth={viewMonth} dayData={dayData} goal={goal} /> : <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 40 }}>載入中...</div>)}
        {tab === "月總結" && (loaded ? <MonthlySummary viewYear={viewYear} viewMonth={viewMonth} dayData={dayData} goal={goal} /> : <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 40 }}>載入中...</div>)}

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>資料儲存於本機瀏覽器</div>
      </div>

      {modalDay !== null && (
        <DayModal viewYear={viewYear} viewMonth={viewMonth} day={modalDay}
          dayData={dayData} setDayData={setDayData} goal={goal} today={today}
          onClose={() => setModalDay(null)} />
      )}
    </div>
  );
}
