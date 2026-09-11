# AGENTS.md

## Project Overview
Next.js 14 app ("EnterprisePDF.ai") for chatting with PDF documents. Uses Clerk for auth, AWS S3 for PDF uploads, Pinecone for vector storage, and OpenAI for embeddings via LangChain.

## Setup Quirks
- **package.json had wrong versions**: `next` was `^10.2.3` and `react` was `^16.13.1` but the code uses Next.js 13+ features (app router, server actions, `next/font/google`). Updated to `next@14.2.5`, `react@18.3.1`, `react-dom@18.3.1`. Removed bogus `latest` package.
- **`eslint@^9` conflicts with `eslint-config-next@14`**: must use `npm install --legacy-peer-deps`.
- **`src/app/globals.css` was missing** (layout imports it but file didn't exist). Created with Tailwind directives, shadcn/ui CSS variables, and `.section-container` utility class.
- **`next.config.js`**: `experimental.serverActions` is deprecated in Next 14 (server actions are on by default). `allowedDevOrigins` is Next 15+ only — not used in Next 14.

## Required Secrets
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` — required to boot (ClerkProvider wraps the app, auth middleware runs on every request). Must be valid `pk_test_`/`pk_live_` and `sk_test_`/`sk_live_` keys.
- S3, Pinecone, OpenAI keys — only needed for the PDF upload/embedding feature, not for the landing page.

## Known Issues
- `src/components/UploadPDF.tsx` imports from `@/actions/pinecone` and `@/actions/s3` (plural) but the directory is `src/action/` (singular). Not fixed — only affects the upload component, not the landing page.
- `@pinecone-database/pinecone` is imported in `src/action/pinecone.ts` but is not in package.json dependencies.

## How to Verify
```bash
curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/  # should return 200
```

## Dev Commands
```bash
docker compose -f docker-compose.base44.yml up -d        # start
docker compose -f docker-compose.base44.yml logs -f web  # tail logs
docker compose -f docker-compose.base44.yml down          # stop
```
