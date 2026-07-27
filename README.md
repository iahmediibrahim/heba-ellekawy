# Shaghbatta

Next.js 16 site for `shaghbatta.com`, powered by Contentful.

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Create a local env file:

```bash
cp .env.example .env.local
```

3. Fill in the required variables:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (optional locally, useful in production)

4. Start the app:

```bash
pnpm dev
```

## Vercel deployment

This repo is ready to deploy directly on Vercel as a standard Next.js app.

### Build settings

- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `.next`

### Required environment variables

Add these in the Vercel project settings for Production, Preview, and Development as needed:

```bash
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_delivery_access_token
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Notes:

- `NEXT_PUBLIC_SITE_URL` should be your final production domain, for example `https://shaghbatta.com`.
- If `NEXT_PUBLIC_SITE_URL` is not set, the app falls back to Vercel-provided deployment URLs and then to `https://shaghbatta.com`.
- The app can still build without Contentful credentials because it has local fallback content, but production should use the real Contentful values.

### Deploy flow

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Set the environment variables above.
4. Trigger the first deployment.
5. Point your custom domain to the Vercel project.

## Verification

Before deploying, you can run:

```bash
pnpm lint
pnpm check
pnpm build
```
# heba-ellekawy
