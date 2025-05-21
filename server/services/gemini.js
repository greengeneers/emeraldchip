exports.loadGenAI = async () => {
  const { GoogleGenAI, Type } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.EMERALDCHIP_API_KEY });
  const type = Type;
  return [ai, type];
};
