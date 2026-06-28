"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkATSScore = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
const checkATSScore = async (req, res) => {
    try {
        const { resumeText, jobRole } = req.body;
        if (!resumeText) {
            res.status(400).json({ message: 'Resume text nahi mila!' });
            return;
        }
        const prompt = `You are an ATS (Applicant Tracking System) expert.

Analyze this resume for the job role: "${jobRole || 'General'}"

Resume Content:
${resumeText.substring(0, 3000)}

Give ATS score analysis as JSON:
{
  "total": <0-100>,
  "grade": <"A"|"B"|"C"|"D">,
  "breakdown": [
    {"label": "Keywords Match", "score": <0-100>, "tip": "specific advice"},
    {"label": "Format & Structure", "score": <0-100>, "tip": "specific advice"},
    {"label": "Action Words", "score": <0-100>, "tip": "specific advice"},
    {"label": "Contact Information", "score": <0-100>, "tip": "specific advice"},
    {"label": "Quantified Results", "score": <0-100>, "tip": "specific advice"},
    {"label": "Skills Section", "score": <0-100>, "tip": "specific advice"}
  ],
  "topSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Return ONLY valid JSON, nothing else.`;
        // ✅ YAHAN MODEL CHANGE KIYA - Ab working models use karo
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            // ✅ Working models (abhi ke liye):
            model: "llama-3.3-70b-versatile", // Naya Llama model (recommended)
            // Ya ye use karo: "mixtral-8x7b-32768"
            // Ya ye: "gemma2-9b-it"
            temperature: 0.3,
        });
        const text = completion.choices[0]?.message?.content || "";
        const cleaned = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleaned);
        res.json(data);
    }
    catch (error) {
        console.error('ATS Check Error:', error);
        res.status(500).json({
            message: 'ATS check failed',
            error: error?.message,
            // Fallback response agar error aaye
            fallback: {
                total: 65,
                grade: "C",
                breakdown: [
                    { "label": "Keywords Match", "score": 60, "tip": "Add more job-specific keywords" },
                    { "label": "Format & Structure", "score": 70, "tip": "Use standard section headers" },
                    { "label": "Action Words", "score": 65, "tip": "Start bullets with action verbs" },
                    { "label": "Contact Information", "score": 75, "tip": "Include LinkedIn and phone" },
                    { "label": "Quantified Results", "score": 55, "tip": "Add numbers and metrics" },
                    { "label": "Skills Section", "score": 65, "tip": "Create dedicated skills section" }
                ],
                topSuggestions: ["Add more metrics", "Include relevant keywords", "Improve formatting"]
            }
        });
    }
};
exports.checkATSScore = checkATSScore;
