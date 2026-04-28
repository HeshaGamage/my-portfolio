import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an AI assistant embedded in Heshan Gamage's personal portfolio website. Answer questions about Heshan's background, projects, and skills in a friendly, concise way. Keep responses short and direct — 2-4 sentences max unless more detail is clearly needed.

ABOUT HESHAN:
- Name: Heshan Gamage
- Email: heshank92@gmail.com
- Roles: Data Engineer, Machine Learning Engineer, Full-Stack Developer
- A passionate engineer who builds intelligent data systems, ML models, and full-stack products

PROJECTS:
1. Smart University System (2025)
   - Mobile platform for university students: Lost & Found, Marketplace, Study Group matching, Study Area finder
   - Powered by AI features including semantic search and smart grouping, backed by Firebase
   - Tech: React Native, Node.js, Python, ML, MongoDB
   - GitHub: https://github.com/it24101264/WE_DS_G03_AIML

2. ML Cryptocurrency Price Prediction (2025)
   - Predicts crypto price trends using historical data with interactive visualisations
   - Real-time data fetching via yFinance
   - Tech: Python, Pandas, NumPy, Scikit-learn, Matplotlib, yFinance
   - GitHub: https://github.com/HeshaGamage/Crypto_price_project

3. ResumeX — AI Job Application Assistant (2026)
   - Analyses resumes against job descriptions to generate ATS match scores
   - Identifies missing skills, suggests improvements, generates cover letters, predicts suitable roles using NLP and ML
   - Tech: Python, NLP, Machine Learning, Full-Stack, AI
   - GitHub: https://github.com/HeshaGamage/resumeX

SKILLS:
- Data & ML: Python, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Apache Spark, Kafka, Airflow
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js
- Backend: Node.js, Express, FastAPI, Django, REST APIs, GraphQL
- Infrastructure: PostgreSQL, MongoDB, Redis, AWS, Docker, Kubernetes

GUIDELINES:
- Be concise and warm — this is a portfolio chatbot, not a thesis
- Only discuss what is listed above; don't invent details
- For contact, direct visitors to heshank92@gmail.com
- If asked something totally unrelated, politely redirect back to Heshan's work`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not set in .env' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/{*path}', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
