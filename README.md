# Pancake

Keep a personal changelog. Get AI generated JSON resumes.

> Submission for the Supabase 2024 Open Source Hackathon

- [Pancake](#pancake)
  - [YouTube demo](#youtube-demo)
  - [Technologies used](#technologies-used)
  - [Features](#features)
  - [Demo](#demo)

## YouTube demo

<https://www.youtube.com/watch?v=LqzZi9sG1ik>

## Technologies used

- Supabase
  - Supabase Boostrap CLI with Next.js starter
  - Supabase Auth
  - Supabase Database with RLS
- Next.js
  - Deployed on Cloudflare Workers
  - Vercel AI SDK
  - ShadCN
  - Tailwind CSS
  - React Query
- OpenAI

## Features

- [x] Keep a changelog of notes in a timeline
- [x] Use AI to iteratively generate a resume for you based on your changelog
- [ ] Edit the AI generated resume in a source code/WYSIWYG editor
- [ ] Connect your LinkedIn profile
- [ ] Upload your existing resume and supporting documents
- [ ] Generate cover letters
- [ ] Create beautiful portfolio pages

## Demo

An instance is hosted here: <https://pancake.sarimabbas.workers.dev/>

## Cloudflare hosting

Cloudflare Workers Builds deploys `main` to the Sarim account.
Node 22.16.0 and Bun 1.3.14 are pinned. Build with `bun run build:worker`,
then deploy the generated bundle with `bun run deploy`.

Build variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_SITE_URL` (`https://pancake.sarimabbas.workers.dev`).
The Supabase settings are also configured at runtime, alongside the encrypted
`OPENAI_API_KEY` secret. The optional example assistant endpoint additionally
requires `ASSISTANT_ID`; it was not configured on Vercel.

The existing Supabase project is paused and cannot be resumed in place.
This migration moves hosting only: login, saved data, and resume generation
require restoring the database separately. After restoration, update both build
and runtime Supabase settings and allow the new site's `/auth/callback` URL in
Supabase Auth. No database data was changed by this migration.
