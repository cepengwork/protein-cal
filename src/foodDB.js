// 台灣食物蛋白質資料庫
// 每筆資料：{ keywords: [...], protein: number, label: string }
// keywords 包含正確名稱、別名、錯別字、簡寫

export const FOOD_DB = [
  // ========== 蛋類 ==========
  { keywords: ["蛋半顆", "半顆蛋", "0.5顆蛋"], protein: 3, label: "雞蛋 半顆" },
  { keywords: ["1顆蛋", "一顆蛋", "雞蛋", "蛋", "水煮蛋", "白煮蛋", "煮蛋"], protein: 6, label: "雞蛋 1顆" },
  { keywords: ["2顆蛋", "兩顆蛋", "雞蛋2顆", "蛋兩顆"], protein: 12, label: "雞蛋 2顆" },
  { keywords: ["3顆蛋", "三顆蛋", "雞蛋3顆", "蛋三顆"], protein: 18, label: "雞蛋 3顆" },
  { keywords: ["4顆蛋", "四顆蛋", "雞蛋4顆"], protein: 24, label: "雞蛋 4顆" },
  { keywords: ["茶葉蛋", "茶蛋", "超商蛋"], protein: 6, label: "茶葉蛋 1顆" },
  { keywords: ["茶葉蛋2顆", "兩顆茶葉蛋"], protein: 12, label: "茶葉蛋 2顆" },
  { keywords: ["滷蛋", "鹵蛋"], protein: 6, label: "滷蛋 1顆" },
  { keywords: ["滷蛋2顆", "兩顆滷蛋"], protein: 12, label: "滷蛋 2顆" },
  { keywords: ["溏心蛋", "半熟蛋"], protein: 6, label: "溏心蛋 1顆" },
  { keywords: ["荷包蛋", "煎蛋", "太陽蛋"], protein: 5, label: "荷包蛋 1顆" },
  { keywords: ["炒蛋", "炒雞蛋", "蛋炒"], protein: 10, label: "炒蛋 2顆份" },
  { keywords: ["茶碗蒸", "蒸蛋"], protein: 8, label: "茶碗蒸 1碗" },
  { keywords: ["皮蛋"], protein: 5, label: "皮蛋 1顆" },

  // ========== 雞肉 ==========
  { keywords: ["雞胸50g", "雞胸肉50g", "半片雞胸"], protein: 11, label: "雞胸肉 50g" },
  { keywords: ["雞胸肉", "雞胸", "鷄胸", "雞胸肉100g"], protein: 22, label: "雞胸肉 100g" },
  { keywords: ["雞胸150g", "雞胸肉150g"], protein: 33, label: "雞胸肉 150g" },
  { keywords: ["雞胸200g", "雞胸肉200g"], protein: 44, label: "雞胸肉 200g" },
  { keywords: ["舒肥雞胸", "舒肥雞", "低溫雞胸", "舒肥"], protein: 26, label: "舒肥雞胸 1包 120g" },
  { keywords: ["舒肥雞胸150g", "舒肥雞150g"], protein: 33, label: "舒肥雞胸 150g" },
  { keywords: ["雞腿", "棒棒腿", "雞腿肉"], protein: 25, label: "雞腿 1支 150g" },
  { keywords: ["大雞腿", "雞腿220g", "大支雞腿"], protein: 36, label: "雞腿 大支 220g" },
  { keywords: ["小雞腿", "雞腿100g"], protein: 19, label: "雞腿 小支 100g" },
  { keywords: ["去骨雞腿排", "雞腿排", "去骨雞腿"], protein: 25, label: "去骨雞腿排 1片" },
  { keywords: ["棒棒腿", "雞棒腿"], protein: 14, label: "棒棒腿 1支" },
  { keywords: ["雞翅", "雞翼", "小雞翅"], protein: 10, label: "雞翅 1支" },
  { keywords: ["雞翅2支", "兩支雞翅"], protein: 20, label: "雞翅 2支" },
  { keywords: ["炸雞排", "雞排", "鷄排", "炸雞"], protein: 25, label: "炸雞排 1片 150g" },
  { keywords: ["鹽酥雞", "鹽酥鷄"], protein: 16, label: "鹽酥雞 100g" },
  { keywords: ["鹽水雞", "鹽雞"], protein: 20, label: "鹽水雞 100g" },
  { keywords: ["三杯雞", "三杯鷄"], protein: 18, label: "三杯雞 100g" },
  { keywords: ["宮保雞丁", "宮爆雞丁"], protein: 16, label: "宮保雞丁 100g" },
  { keywords: ["即食雞胸", "超商雞胸", "即食雞胸肉"], protein: 28, label: "即食雞胸肉 1包 130g" },
  { keywords: ["即食雞胸180g"], protein: 38, label: "即食雞胸肉 1包 180g" },

  // ========== 豬肉 ==========
  { keywords: ["豬里肌", "里肌肉", "里肌", "豬里肌肉"], protein: 20, label: "豬里肌 100g" },
  { keywords: ["豬排", "豬肉排"], protein: 20, label: "豬排 1片 100g" },
  { keywords: ["豬五花", "五花肉", "三層肉"], protein: 12, label: "豬五花 100g" },
  { keywords: ["控肉", "爌肉", "焢肉", "滷肉塊", "滷豬肉"], protein: 14, label: "控肉 1塊 100g" },
  { keywords: ["豬腳", "滷豬腳"], protein: 16, label: "豬腳 100g" },
  { keywords: ["豬絞肉", "絞肉", "碎肉"], protein: 15, label: "豬絞肉 100g" },
  { keywords: ["貢丸", "豬肉丸"], protein: 3, label: "貢丸 1顆" },
  { keywords: ["貢丸3顆"], protein: 9, label: "貢丸 3顆" },
  { keywords: ["貢丸5顆"], protein: 15, label: "貢丸 5顆" },
  { keywords: ["香腸", "臺灣香腸", "台灣香腸"], protein: 8, label: "香腸 1條" },
  { keywords: ["培根", "培根1片"], protein: 4, label: "培根 1片" },
  { keywords: ["培根2片", "兩片培根"], protein: 8, label: "培根 2片" },
  { keywords: ["獅子頭", "大肉丸"], protein: 14, label: "獅子頭 1顆 100g" },
  { keywords: ["豬血", "豬血湯", "豬血糕", "米血"], protein: 8, label: "豬血湯 1碗" },

  // ========== 牛肉 ==========
  { keywords: ["牛肉", "牛"], protein: 18, label: "牛肉 100g" },
  { keywords: ["牛腱", "牛腱肉"], protein: 20, label: "牛腱 100g" },
  { keywords: ["牛排", "菲力", "菲力牛排"], protein: 36, label: "牛排 1片 200g" },
  { keywords: ["牛絞肉"], protein: 17, label: "牛絞肉 100g" },
  { keywords: ["火鍋牛肉片", "牛肉片"], protein: 20, label: "牛肉片 100g" },

  // ========== 海鮮 ==========
  { keywords: ["鮭魚100g"], protein: 20, label: "鮭魚 100g" },
  { keywords: ["鮭魚", "三文魚", "salmon", "鮭魚排"], protein: 28, label: "鮭魚 1片 150g" },
  { keywords: ["鮭魚200g"], protein: 38, label: "鮭魚 200g" },
  { keywords: ["虱目魚", "虱目魚肚", "虱目"], protein: 30, label: "虱目魚 1片 150g" },
  { keywords: ["鮪魚罐頭", "鮪魚罐", "鮪魚"], protein: 14, label: "鮪魚罐頭 1罐 85g" },
  { keywords: ["鮪魚罐頭半罐", "半罐鮪魚"], protein: 7, label: "鮪魚罐頭 半罐" },
  { keywords: ["蝦仁", "草蝦", "白蝦", "蝦"], protein: 16, label: "蝦仁 100g" },
  { keywords: ["蝦仁5隻", "5隻蝦", "五隻蝦"], protein: 9, label: "蝦仁 5隻" },
  { keywords: ["花枝", "烏賊", "墨魚"], protein: 12, label: "花枝 100g" },
  { keywords: ["透抽", "小卷", "魷魚"], protein: 14, label: "透抽 100g" },
  { keywords: ["秋刀魚", "烤秋刀"], protein: 16, label: "秋刀魚 1條" },
  { keywords: ["鯖魚", "烤鯖魚"], protein: 18, label: "鯖魚 1片 100g" },
  { keywords: ["鯛魚", "台灣鯛", "吳郭魚"], protein: 16, label: "鯛魚 1片 100g" },
  { keywords: ["吻仔魚", "魩仔魚"], protein: 3, label: "吻仔魚 1湯匙 20g" },
  { keywords: ["文蛤", "蛤蜊", "花蛤"], protein: 10, label: "文蛤 100g" },
  { keywords: ["蟹肉棒", "蟹味棒"], protein: 8, label: "蟹肉棒 100g" },

  // ========== 豆漿 ==========
  { keywords: ["高蛋白豆漿半瓶", "高蛋白豆漿200ml", "200ml高蛋白豆漿"], protein: 10, label: "高蛋白豆漿 半瓶 200ml" },
  { keywords: ["高蛋白豆漿", "高蛋白豆奶", "高蛋白豆漿400ml"], protein: 20, label: "高蛋白豆漿 1瓶 400ml" },
  { keywords: ["豆漿250ml", "小杯豆漿", "一杯豆漿"], protein: 8, label: "豆漿 1杯 250ml" },
  { keywords: ["豆漿400ml", "豆漿一瓶", "豆漿1瓶"], protein: 13, label: "豆漿 1瓶 400ml" },
  { keywords: ["豆漿450ml"], protein: 15, label: "豆漿 1瓶 450ml" },
  { keywords: ["豆漿", "豆奶", "無糖豆漿"], protein: 8, label: "豆漿 1杯 250ml" },

  // ========== 豆製品 ==========
  { keywords: ["嫩豆腐半盒", "半盒豆腐", "豆腐半盒"], protein: 7, label: "嫩豆腐 半盒 150g" },
  { keywords: ["嫩豆腐", "豆腐", "軟豆腐", "盒裝豆腐", "嫩豆腐1盒"], protein: 15, label: "嫩豆腐 1盒 300g" },
  { keywords: ["板豆腐100g", "傳統豆腐100g"], protein: 7, label: "板豆腐 100g" },
  { keywords: ["板豆腐", "傳統豆腐", "硬豆腐"], protein: 21, label: "板豆腐 1塊 300g" },
  { keywords: ["雞蛋豆腐", "玉子豆腐", "蛋豆腐"], protein: 8, label: "雞蛋豆腐 1盒 150g" },
  { keywords: ["豆干1塊", "豆乾1塊", "一塊豆干"], protein: 4, label: "豆干 1塊 30g" },
  { keywords: ["豆干2塊", "豆乾2塊", "兩塊豆干", "兩塊豆乾"], protein: 9, label: "豆干 2塊 60g" },
  { keywords: ["豆干3塊", "豆乾3塊", "三塊豆干"], protein: 13, label: "豆干 3塊 90g" },
  { keywords: ["豆干", "豆乾", "五香豆干", "黑豆干"], protein: 14, label: "豆干 100g" },
  { keywords: ["豆包", "豆腐皮", "豆皮"], protein: 20, label: "豆包 1片 100g" },
  { keywords: ["豆包小片", "豆包60g"], protein: 12, label: "豆包 1片 60g" },
  { keywords: ["毛豆半碗", "毛豆50g"], protein: 6, label: "毛豆 半碗 50g" },
  { keywords: ["毛豆", "枝豆", "毛豆仁"], protein: 11, label: "毛豆 1碗 100g" },
  { keywords: ["納豆"], protein: 8, label: "納豆 1盒 50g" },
  { keywords: ["黃豆", "大豆"], protein: 35, label: "黃豆 100g" },
  { keywords: ["黑豆", "黑豆仁"], protein: 33, label: "黑豆 100g" },
  { keywords: ["鷹嘴豆", "雪蓮子"], protein: 9, label: "鷹嘴豆 100g" },

  // ========== 乳製品 ==========
  { keywords: ["希臘優格", "希臘式優格", "greek yogurt"], protein: 6, label: "希臘優格 1盒 100g" },
  { keywords: ["希臘優格170g", "大盒希臘優格"], protein: 10, label: "希臘優格 1盒 170g" },
  { keywords: ["高蛋白優格", "高蛋白希臘優格"], protein: 10, label: "高蛋白優格 1盒 100g" },
  { keywords: ["高蛋白優格170g", "大盒高蛋白優格"], protein: 17, label: "高蛋白優格 1盒 170g" },
  { keywords: ["優格", "原味優格", "無糖優格"], protein: 3, label: "一般優格 1盒 100g" },
  { keywords: ["牛奶半杯", "牛奶120ml"], protein: 4, label: "牛奶 半杯 120ml" },
  { keywords: ["牛奶", "鮮奶", "全脂牛奶", "牛奶1杯"], protein: 8, label: "牛奶 1杯 240ml" },
  { keywords: ["牛奶300ml", "牛奶1盒", "盒裝鮮奶"], protein: 10, label: "牛奶 1盒 300ml" },
  { keywords: ["起司片", "起士片", "乳酪片", "cheese片"], protein: 4, label: "起司片 1片 20g" },
  { keywords: ["起司片2片", "兩片起司"], protein: 8, label: "起司片 2片" },
  { keywords: ["茅屋起司", "cottage cheese"], protein: 11, label: "茅屋起司 100g" },

  // ========== 蛋白補充品 ==========
  { keywords: ["乳清蛋白半匙", "乳清半匙"], protein: 11, label: "乳清蛋白 半匙 15g" },
  { keywords: ["乳清蛋白", "乳清", "whey", "蛋白粉", "乳清1匙"], protein: 22, label: "乳清蛋白 1匙 30g" },
  { keywords: ["乳清蛋白1.5匙", "乳清1.5匙"], protein: 33, label: "乳清蛋白 1.5匙 45g" },
  { keywords: ["大豆蛋白粉半匙", "豆蛋白半匙"], protein: 11, label: "大豆蛋白粉 半匙 15g" },
  { keywords: ["大豆蛋白粉", "豆蛋白粉", "大豆粉", "大豆蛋白"], protein: 22, label: "大豆蛋白粉 1匙 30g" },

  // ========== 便當/外食 ==========
  { keywords: ["雞胸便當", "雞胸飯", "健康餐雞胸"], protein: 30, label: "雞胸便當 1個" },
  { keywords: ["雞腿便當", "雞腿飯"], protein: 28, label: "雞腿便當 1個" },
  { keywords: ["排骨便當", "排骨飯", "炸排骨便當"], protein: 22, label: "排骨便當 1個" },
  { keywords: ["控肉便當", "爌肉飯", "焢肉便當", "控肉飯"], protein: 18, label: "控肉便當 1個" },
  { keywords: ["魚排便當", "魚便當"], protein: 24, label: "魚排便當 1個" },
  { keywords: ["便當", "一般便當", "外食便當"], protein: 20, label: "一般便當 1個" },
  { keywords: ["健康餐", "低卡餐", "地瓜雞胸餐", "健身餐"], protein: 30, label: "健康餐 1份" },
  { keywords: ["自助餐肉多", "自助餐多肉"], protein: 28, label: "自助餐 肉多" },
  { keywords: ["自助餐", "自助餐肉少"], protein: 18, label: "自助餐 1份" },
  { keywords: ["魯肉飯", "滷肉飯", "肉燥飯"], protein: 12, label: "魯肉飯 1碗" },
  { keywords: ["雞肉飯", "火雞肉飯"], protein: 16, label: "雞肉飯 1碗" },
  { keywords: ["牛肉麵", "紅燒牛肉麵"], protein: 22, label: "牛肉麵 1碗" },
  { keywords: ["排骨麵", "排骨湯麵"], protein: 20, label: "排骨麵 1碗" },
  { keywords: ["雞湯麵", "雞肉麵"], protein: 16, label: "雞湯麵 1碗" },
  { keywords: ["肉燥麵", "滷肉麵", "肉臊麵"], protein: 12, label: "肉燥麵 1碗" },
  { keywords: ["乾麵", "乾拌麵"], protein: 8, label: "乾麵 1碗" },
  { keywords: ["拉麵", "日式拉麵"], protein: 18, label: "拉麵 1碗" },

  // ========== 早餐 ==========
  { keywords: ["蛋餅加蛋", "雙蛋蛋餅", "蛋餅+蛋"], protein: 14, label: "蛋餅加蛋 1份" },
  { keywords: ["蛋餅", "蛋捲餅"], protein: 8, label: "蛋餅 1份" },
  { keywords: ["火腿蛋吐司", "火腿蛋", "火腿蛋土司"], protein: 12, label: "火腿蛋吐司 1份" },
  { keywords: ["起司蛋吐司", "起士蛋吐司", "起司蛋"], protein: 13, label: "起司蛋吐司 1份" },
  { keywords: ["肉蛋吐司", "肉蛋土司"], protein: 14, label: "肉蛋吐司 1份" },
  { keywords: ["三明治", "土司三明治"], protein: 10, label: "三明治 1份" },
  { keywords: ["早餐漢堡", "漢堡"], protein: 12, label: "漢堡 1個" },
  { keywords: ["鮪魚飯糰", "鮪魚onigiri"], protein: 8, label: "鮪魚飯糰 1個" },
  { keywords: ["飯糰", "御飯糰", "onigiri"], protein: 6, label: "飯糰 1個" },

  // ========== 台式小吃 ==========
  { keywords: ["水餃5顆", "五顆水餃"], protein: 9, label: "水餃 5顆" },
  { keywords: ["水餃10顆", "水餃一份", "水餃"], protein: 18, label: "水餃 10顆" },
  { keywords: ["水餃12顆", "十二顆水餃"], protein: 22, label: "水餃 12顆" },
  { keywords: ["水餃15顆", "十五顆水餃"], protein: 27, label: "水餃 15顆" },
  { keywords: ["鍋貼5個", "五個鍋貼"], protein: 9, label: "鍋貼 5個" },
  { keywords: ["鍋貼10個", "鍋貼一份", "鍋貼"], protein: 18, label: "鍋貼 10個" },
  { keywords: ["臭豆腐"], protein: 10, label: "臭豆腐 1份" },
  { keywords: ["肉圓", "彰化肉圓"], protein: 7, label: "肉圓 1個" },
  { keywords: ["碗粿", "碗糕"], protein: 5, label: "碗粿 1個" },
  { keywords: ["蚵仔煎", "蚵煎"], protein: 8, label: "蚵仔煎 1份" },

  // ========== 超商 ==========
  { keywords: ["關東煮豆腐", "關東煮嫩豆腐"], protein: 4, label: "關東煮豆腐 1塊" },
  { keywords: ["關東煮貢丸", "關東煮"], protein: 9, label: "關東煮貢丸 3顆" },
  { keywords: ["雞塊", "麥克雞塊", "炸雞塊"], protein: 12, label: "雞塊 6塊" },

  // ========== 主食 ==========
  { keywords: ["白飯半碗", "半碗飯", "飯半碗"], protein: 2, label: "白飯 半碗 100g" },
  { keywords: ["白飯", "飯", "米飯", "一碗飯"], protein: 4, label: "白飯 1碗 200g" },
  { keywords: ["地瓜", "番薯", "地瓜半條"], protein: 1, label: "地瓜 100g" },
  { keywords: ["燕麥半碗", "燕麥50g"], protein: 6, label: "燕麥 半碗 50g" },
  { keywords: ["燕麥", "大燕麥片", "即食燕麥"], protein: 11, label: "燕麥 1碗 100g" },
  { keywords: ["吐司1片", "一片吐司", "麵包1片"], protein: 3, label: "吐司 1片" },
  { keywords: ["吐司2片", "吐司", "兩片吐司", "土司"], protein: 5, label: "吐司 2片" },
  { keywords: ["饅頭半個", "半個饅頭"], protein: 3, label: "饅頭 半個" },
  { keywords: ["饅頭", "白饅頭"], protein: 5, label: "饅頭 1個" },
];

// ========== 模糊比對函式 ==========

/**
 * 計算兩個字串的相似度（0~1）
 * 用於處理錯別字與簡寫
 */
function similarity(a, b) {
  a = a.toLowerCase().replace(/\s/g, "");
  b = b.toLowerCase().replace(/\s/g, "");
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.9;

  // 計算共同字符數
  const setA = new Set(a.split(""));
  const setB = new Set(b.split(""));
  const intersection = [...setA].filter(c => setB.has(c)).length;
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
}

/**
 * 輸入食物描述，回傳最接近的資料庫結果
 * @param {string} input 使用者輸入
 * @returns {{ label: string, protein: number, confidence: string } | null}
 */
export function analyzeLocal(input) {
  if (!input || !input.trim()) return null;

  const query = input.trim().toLowerCase().replace(/\s/g, "");
  let bestMatch = null;
  let bestScore = 0;

  for (const item of FOOD_DB) {
    for (const kw of item.keywords) {
      const kwClean = kw.toLowerCase().replace(/\s/g, "");

      // 完全包含 → 高分
      if (query.includes(kwClean) || kwClean.includes(query)) {
        const score = 0.85 + (Math.min(query.length, kwClean.length) / Math.max(query.length, kwClean.length)) * 0.15;
        if (score > bestScore) { bestScore = score; bestMatch = item; }
        continue;
      }

      // 模糊比對
      const score = similarity(query, kwClean);
      if (score > bestScore) { bestScore = score; bestMatch = item; }
    }
  }

  // 低於門檻視為找不到
  if (bestScore < 0.4 || !bestMatch) return null;

  return {
    label: bestMatch.label,
    protein: bestMatch.protein,
    confidence: bestScore >= 0.85 ? "高" : bestScore >= 0.6 ? "中" : "低",
  };
}
