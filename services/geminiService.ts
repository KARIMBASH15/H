
import { GoogleGenAI, Type } from "@google/genai";
import { Reservation, Room } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Suggests dynamic pricing based on a context (season, events).
   */
  async getSmartPricingSuggestions(rooms: Room[]): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `قم بتحليل الغرف التالية واقترح أسعاراً ذكية (Smart Pricing) لموسم الأعياد القادم في الفندق. الغرف: ${JSON.stringify(rooms)}. اذكر الأسباب باللغة العربية.`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "لا توجد اقتراحات حالية.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "فشل الاتصال بخدمة الذكاء الاصطناعي.";
    }
  },

  /**
   * Detects if a booking might be suspicious based on patterns.
   */
  async detectSuspiciousBooking(reservation: Partial<Reservation>): Promise<boolean> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `هل يعتبر هذا الحجز مشبوهاً؟ (مثلاً حجز لغرف كثيرة في وقت قصير جداً أو بيانات غريبة). الحجز: ${JSON.stringify(reservation)}. أجب بـ "نعم" أو "لا" فقط.`,
        config: {
          maxOutputTokens: 10,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text?.includes("نعم") || false;
    } catch {
      return false;
    }
  }
};
