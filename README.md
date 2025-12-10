🎄 Secret Santa AI — Team Gift Exchange App

A modern Secret Santa application with team codes, database storage, AI-powered gift suggestions, Amazon affiliate integration, and a beautiful Christmas UI.

Built with ❤️ using React, Vite, Supabase, Groq AI, and Vercel.

🚀  Demo

👉 https://secret-santa-git-master-shashanks-projects-b58e69bc.vercel.app/



✨ Features
👥 Team Management

Host creates a team → receives a unique team code

Members join using the team code

Participants provide:

Name

Email

Age

Gender

Marital Status

Wishlist

🎁 Smart Random Pairing

Host runs pairing once everyone joins

No one gets themselves

Results stored securely in Supabase

Participants can privately reveal their assigned partner

🤖 AI-Powered Gift Suggestions

AI analyzes:

Wishlist

Age

Gender

Marital Status

Generates 15 curated gift ideas

Includes Amazon affiliate links for each gift

A second AI Gift Search allows custom queries like:

“Gifts for a gamer under 1500 rupees”

“Romantic gifts for a wife”

🛍️ Amazon Affiliate Support

Earn passive income from Amazon links — perfect for monetizing the app!

All AI suggestions include Amazon affiliate search URLs

Affiliate tag used: secretsantaai-21

🎨 Modern Christmas UI

Snowfall animation

Gradient header

Clean glass-card layout

Smooth transitions and responsive design

🧹 Automatic Cleanup

A scheduled job deletes teams, participants, and pairings older than 30 days to keep your DB clean.

Handled via:

/api/cleanup

vercel.json cron job

🧱 Tech Stack
🎨 Frontend

React (Vite)

TailwindCSS

React Router

Custom Snowfall component

🗄️ Backend

Supabase (Postgres DB)

Vercel Serverless Functions

Scheduled Cron Jobs

🤖 AI

Groq LLM (fast, affordable)

JSON-cleaning pipeline to parse AI responses safely

📁 Project Structure (Important)
api/
  createTeam/
  addParticipant/
  runPairing/
  revealPartner/
  giftSuggestions/
  giftSearch/
  cleanup/
  supabaseClient.js

src/
  pages/
    LandingPage.jsx
    Home.jsx
    CreateTeam.jsx
    JoinTeam.jsx
    TeamDashboard.jsx
    RevealPartner.jsx
    Suggestions.jsx
  components/
    Snowfall.jsx
    RevealCard.jsx
  lib/
    supabaseClient.js
  utils/
    giftAI.js
    pairing.js

🛠️ Setup Instructions (Local)
1️⃣ Install dependencies
npm install

2️⃣ Environment variables

Create .env.local:

SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE=your_service_role
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
GROQ_API_KEY=your_groq_key

3️⃣ Run locally
npm run dev

4️⃣ Run API locally (Vercel)
vercel dev

🌐 Deployment

This project uses Vercel for frontend + API hosting.

Just push to GitHub and Vercel deploys automatically.

Cron job in vercel.json triggers /api/cleanup daily.



Realtime updates (Supabase subscriptions)

Admin dashboard

Multi-team organizations

Company branding themes

🤝 Contributing

PRs welcome!
Open issues for bugs or feature requests.

💙 Author

Shashank Mukkala

GitHub: https://github.com/shashankmukkala

Twitter/Instagram/YT: TelusaBro (https://www.instagram.com/telusabro/)
