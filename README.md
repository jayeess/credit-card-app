# Credit Card Application

Multi-step form for credit card applications.

## Setup

```bash
npm install
npx prisma db push
npm run dev
```

Open http://localhost:3000

## Stack

- Next.js 16, TypeScript, Tailwind v4
- Prisma + PostgreSQL (Neon)
- Zod for validation

## What it does

- 4-step wizard (details, documents, review, status)
- File uploads for ID/salary cert
- Form validation
- Stores applications in DB
