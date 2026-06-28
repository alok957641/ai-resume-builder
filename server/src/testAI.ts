import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
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

    console.log(
      '✅ AI working:',
      completion.choices[0]?.message?.content
    );
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();