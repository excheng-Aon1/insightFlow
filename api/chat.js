export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body safely
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { question, business_profile, live_context } = body;
  const q_raw = (question || '').trim();

  const groq_api_key = process.env.GROQ_API_KEY;
  const groq_model = process.env.GROQ_AI_MODEL || 'qwen/qwen3.8-27b';

  const bp = business_profile || {};
  const ctx = live_context || {};

  const biz_name = bp.businessName || 'InsightFlow Flagship Store';
  const biz_industry = bp.industry || 'ค้าปลีกและอีคอมเมิร์ซ (Retail & E-Commerce)';
  const biz_margin = bp.grossMarginPct || 38.5;
  const current_rev = ctx.currentRevenue || 4829000;
  const target_rev = ctx.targetRevenue || bp.monthlyTarget || 5000000;
  const gap_rev = Math.max(0, target_rev - current_rev);
  const biz_pain = bp.painPoints || 'ลูกค้าเก่าหายไปบางส่วน และต้องการคุมสต็อกไม่ให้ขาดมือ';
  const biz_rules = bp.customRules || 'เน้นดูแลลูกค้า VIP และตรวจจับการยกเลิกบิล (Void) หน้าเครื่อง POS ทุกวัน';

  const system_prompt = `คุณคือ 'InsightFlow AI Copilot' ที่ปรึกษาอัจฉริยะประจำร้าน '${biz_name}' (${biz_industry})
หน้าที่: ให้คำแนะนำเชิงลึกด้านธุรกิจ ยอดขาย กำไร การตลาด คลังสินค้า และป้องกันการทุจริต โดยวิเคราะห์จากข้อมูลจริงของร้านต่อไปนี้:
1. สถานะการเงิน: ยอดขายปัจจุบัน ฿${Number(current_rev).toLocaleString()} / เป้าหมาย ฿${Number(target_rev).toLocaleString()} (ส่วนต่าง ฿${Number(gap_rev).toLocaleString()}, กำไรขั้นต้นเฉลี่ย ${biz_margin}%)
2. ฐานลูกค้า: ลูกค้า VIP (Champion) 284 คน, ลูกค้ากลุ่มเสี่ยงเลิกซื้อ (At-Risk ขาดการติดต่อเกิน 45 วัน) 139 คน (มูลค่าที่ดึงกลับได้ ฿164,900 เช่น คุณกิตติพงศ์ หายไป 58 วัน, คุณณัฐนิชา หายไป 64 วัน)
3. แคชเชียร์ & จุดขาย: พนักงานขายดีอันดับ 1 คือ คุณภัทรพล (ยอดขาย ฿684,500, Up-sell 44.1%) และตรวจพบความเสี่ยงทุจริตบิลที่เครื่อง POS #4 มีการกดยกเลิกบิล (Void) 14 ครั้ง
4. คลังสินค้า: สินค้าใกล้หมด กล่องพัสดุ (12 ชิ้น), เซ็ตของขวัญ (0 ชิ้น), สินค้าค้างสต็อกนานคือ ครีมกันแดด 280 ชิ้น
5. ช่องทางทำกำไร: แชตร้านค้าโดยตรง (Direct Chat) ให้กำไรสุทธิสูงสุด 52.4% (ค่าธรรมเนียมเพียง 5%)
6. กฎและโจทย์เฉพาะของร้าน: ${biz_pain} | กฎพิเศษ: ${biz_rules}

แนวทางการตอบ:
- ตอบเป็นภาษาไทยอย่างมืออาชีพ สุภาพ ชัดเจน และกระชับ
- ใช้ Bullet points และการเน้นตัวหนาเพื่อให้เจ้าของร้านอ่านเข้าใจง่ายใน 30 วินาที
- ให้ Action Plan หรือคำแนะนำที่เป็นรูปธรรมที่เจ้าของร้านสามารถกดทำได้ทันทีบนระบบ InsightFlow`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groq_api_key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: groq_model,
        messages: [
          { role: 'system', content: system_prompt },
          { role: 'user', content: q_raw }
        ],
        max_tokens: 750,
        temperature: 0.3
      })
    });

    if (groqRes.ok) {
      const data = await groqRes.json();
      const aiText = data?.choices?.[0]?.message?.content?.trim();
      if (aiText) {
        return res.status(200).json({
          status: 'success',
          answer: aiText,
          matched_module: `Groq Neural Engine (${groq_model})`,
          business_name: biz_name,
          industry: biz_industry,
          engine: 'groq_llm',
          model: groq_model,
          timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.'
        });
      }
    }
  } catch (err) {
    console.error('Groq API Error on Vercel:', err);
  }

  // Graceful fallback trigger for client-side engine
  return res.status(200).json({
    status: 'fallback',
    answer: '',
    message: 'Falling back to client-side rule engine'
  });
}
