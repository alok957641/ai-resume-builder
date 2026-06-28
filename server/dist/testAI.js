"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
async function test() {
    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'user',
                    content: 'Say hello in one word',
                },
            ],
        });
        console.log('✅ AI working:', completion.choices[0]?.message?.content);
    }
    catch (error) {
        console.error('❌ Error:', error);
    }
}
test();
