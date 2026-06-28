"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterviewQuestions = exports.suggestSkills = exports.improveExperience = exports.improveSummary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
// ✅ Summary improve karo
const improveSummary = async (req, res) => {
    try {
        const { summary, jobTitle } = req.body;
        const prompt = `Tu ek professional resume writer hai.

Mera current summary ye hai:
"${summary}"

Mera job title: ${jobTitle || 'Software Developer'}

Isko ek powerful, ATS-friendly professional summary mein improve karo.
- 3-4 sentences mein rakho
- Action words use karo
- Skills aur achievements highlight karo
- First person mein mat likho
- Sirf improved summary return karo.`;
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
        });
        const improved = completion.choices[0]?.message?.content || '';
        res.json({ improved });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI error' });
    }
};
exports.improveSummary = improveSummary;
// ✅ Experience improve karo
const improveExperience = async (req, res) => {
    try {
        const { description, position, company } = req.body;
        const prompt = `Tu ek professional resume writer hai.

Position: ${position} at ${company}
Current description: "${description}"

Isko strong resume bullet points mein convert karo:
- Har point action verb se shuru ho
- Numbers aur metrics add karo jahan possible ho
- 3-4 bullet points banao
- ATS friendly rakho
- Sirf bullet points return karo.`;
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
        });
        const improved = completion.choices[0]?.message?.content || '';
        res.json({ improved });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI error' });
    }
};
exports.improveExperience = improveExperience;
// ✅ Skills suggest karo
const suggestSkills = async (req, res) => {
    try {
        const { jobTitle, currentSkills } = req.body;
        const prompt = `Job Title: ${jobTitle}
Current Skills: ${currentSkills.join(', ')}

Is role ke liye 8-10 important skills suggest karo jo missing hain.
Sirf comma separated skill names return karo.

Example:
React, Node.js, MongoDB, Docker`;
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
        });
        const text = completion.choices[0]?.message?.content || '';
        const skills = text
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        res.json({ skills });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI error' });
    }
};
exports.suggestSkills = suggestSkills;
const generateInterviewQuestions = async (req, res) => {
    try {
        const { position, skills, experience } = req.body;
        const prompt = `You are an expert interviewer.

Candidate profile:
Position: ${position}
Skills: ${skills.join(', ')}
Experience: ${experience}

Generate 10 interview questions:
- 3 Technical
- 3 Behavioral
- 2 Situational
- 2 HR

Return ONLY JSON array:
[{"type":"Technical","question":"..."}]`;
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
        });
        const text = completion.choices[0]?.message?.content || '';
        const cleaned = text.replace(/```json|```/g, '').trim();
        const questions = JSON.parse(cleaned);
        res.json({ questions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI error', error: error?.message });
    }
};
exports.generateInterviewQuestions = generateInterviewQuestions;
