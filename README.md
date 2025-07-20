This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction

The website consists of two main pages: a Points Table page and an All Matches page:

- Both pages feature an Upcoming Matches sidebar for quick access to future games.
- The Matches page displays a list of all matches, including ongoing live matches, which are updated using polling to simulate real-time updates. This page is rendered using Server-Side Rendering (SSR) to ensure up-to-date content.
- The Points Table page includes a filter to view historic data and is statically generated (SSG) for performance benefits. However, the statically generated points table pages are currently not being revalidated, resulting in stale data on updates.
- The entire website is mobile responsive, offering a seamless user experience across devices.
- Live Link - [https://ipl-dashboard-assignment.vercel.app/points-table/2024](https://ipl-dashboard-assignment.vercel.app/points-table/2024)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
