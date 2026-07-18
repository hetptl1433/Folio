# Het Patel — Portfolio

Interactive React/Vite portfolio with a 3D home experience and Sushi, a portfolio-aware AI assistant.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values you use.

3. Run the frontend only:

   ```bash
   npm run dev
   ```

   The Vite development server also mounts the local `/api/chat` handler, so Sushi can use the server-only `OPENAI_API_KEY` from `.env.local`.

4. To emulate the complete Vercel runtime instead, you can run:

   ```bash
   npx vercel dev
   ```

## Sushi AI

- Approved portfolio facts live in `src/data/portfolio.js`.
- The About and Projects UI reuse that same data, keeping visible content and AI answers aligned.
- The browser sends the current question and bounded conversation history to `/api/chat`.
- `api/chat.js` calls OpenAI with `OPENAI_API_KEY` on the server. The key is never sent to the browser.
- `OPENAI_MODEL` is optional and defaults to `gpt-4o-mini`.
- Conversation history is capped and stored only for the current browser tab with `sessionStorage`.

For production, configure `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) in the Vercel project's Development, Preview, and Production environments, then redeploy. Because the endpoint is public, configure a Vercel Firewall rate-limit rule for `/api/chat` before promoting it widely.

## Checks

```bash
npm run lint
npm run build
```
