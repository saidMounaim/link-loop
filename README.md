# LinkLoop

**LinkLoop** is a clean, minimal Linktree-style web app built with Next.js 15, Prisma, BetterAuth, and ShadCN/UI. Easily share multiple links through a personalized profile. Users can sign up, manage profiles, and customize their link collections with emoji and titles.

## 🚀 Demo

Check out a live demo profile:  
[https://link-loop-share.vercel.com/profile/saidmounaim](https://link-loop-share.vercel.com/profile/saidmounaim)

## Getting Started

### 1. Clone the repository

Run the following command to clone the repo:

git clone https://github.com/saidMounaim/link-loop.git

### 2. Install dependencies

Install all dependencies by running:

npm install

### 3. Create a `.env` file

Create a `.env` file in the root directory with the following environment variables:

DATABASE_URL=""
BETTER_AUTH_BASE_URL=""
BETTER_AUTH_SECRET=""

Make sure your `.env` file is configured correctly to connect to your database and BetterAuth.

### 4. Run the development server

Start the development server with:

npm run dev

## Features

- 🔐 User sign-up and sign-in with BetterAuth
- 👤 Create profile with avatar, bio, and username
- 🔗 Add, edit, reorder, and delete links with emoji and title
- 📊 Track link click counts
- 💅 Clean and responsive UI using ShadCN/UI and Tailwind CSS

## Built With

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/)
- [BetterAuth](https://www.better-auth.com/)

## Contribution

All kinds of contributions are welcome 🙌  
Feel free to fork the repo, create a feature branch, and submit a pull request.
