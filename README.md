# MindMesh Labs Portfolio

A full-featured portfolio platform for developers to showcase their work and capture leads. This version is integrated with Supabase for a persistent backend and Google Gemini for AI-powered features.

## Features

- **Supabase Backend:** All data is stored in a central, persistent PostgreSQL database.
- **Secure Authentication:** User login is handled by Supabase Auth.
- **AI-Powered Q&A:** Visitors can ask questions about your projects and get answers from a Gemini-powered AI bot.
- **Public Portfolio:** Showcase projects with descriptions, tech stacks, and complexity ratings, fetched live from the database.
- **Admin Dashboard:** A secure area to manage projects, view captured leads, and update site settings.
- **Lead Capture:** Forms to capture contact information from potential clients, saved directly to your database.
- **Dynamic Filtering & Sorting:** Easily find projects on the public page.
- **Dark/Light Mode:** Theme toggling for user preference.
- **Responsive Design:** Looks great on all devices.

---

## Setup & Deployment Guide

Follow these instructions carefully to get your portfolio running both locally and on a hosting provider like Vercel.

### Part 1: Set Up Your Supabase Backend

1.  **Create a Supabase Project:**
    *   Go to [supabase.com](https://supabase.com), sign up, and create a new project.
    *   Save your **Project URL** and **`anon` public key**. You will need them in Part 2.

2.  **Create Database Tables:**
    *   In your Supabase project dashboard, navigate to the `SQL Editor`.
    *   Click `+ New query` and paste the entire content of the SQL script below. This will create your `projects`, `settings`, and `leads` tables and set up security policies.
    *   Click `RUN` to execute the script.

    ```sql
    -- 1. Create Projects Table
    create table projects (
      id bigint generated by default as identity primary key,
      "name" text not null,
      "shortDescription" text,
      "longDescription" text,
      "projectUrl" text,
      technologies text[],
      complexity real,
      "projectDate" date,
      "isActive" boolean default true,
      avatar text,
      "avatarColor" text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- 2. Create Leads Table
    create table leads (
      id bigint generated by default as identity primary key,
      email text not null,
      phone text,
      "projectId" bigint,
      "projectName" text,
      "date" text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- 3. Create Settings Table
    create table settings (
      id bigint generated by default as identity primary key,
      "contactEmail" text,
      "siteTitle" text,
      "siteTagline" text,
      "aboutMe" text,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- 4. Insert initial settings data (you will only have one row in this table)
    insert into settings (id, "siteTitle", "siteTagline", "aboutMe", "contactEmail")
    values (1, 'MindMesh Labs', 'Built by Devs. Backed by AI.', 'Welcome to my portfolio! I am a passionate developer specializing in creating modern, responsive, and user-friendly web applications.', 'your-email@example.com');

    -- 5. Set up Row Level Security (RLS) policies
    
    -- For PROJECTS table
    alter table projects enable row level security;
    create policy "Projects are viewable by everyone." on projects for select using (true);
    create policy "Authenticated users can manage projects." on projects for all using (auth.role() = 'authenticated');

    -- For LEADS table
    alter table leads enable row level security;
    create policy "Leads can be created by anyone." on leads for insert with check (true);
    create policy "Authenticated users can view leads." on leads for select using (auth.role() = 'authenticated');
    create policy "Authenticated users can delete leads." on leads for delete using (auth.role() = 'authenticated');


    -- For SETTINGS table
    alter table settings enable row level security;
    create policy "Settings are viewable by everyone." on settings for select using (true);
    create policy "Authenticated users can update settings." on settings for update using (auth.role() = 'authenticated');
    ```

3.  **Create Your Admin User:**
    *   In the Supabase dashboard, go to `Authentication` -> `Users`.
    *   Click `+ Add user` and create a user with an email and a strong password. **This will be your admin login.**
    *   **Important**: You might receive a confirmation email. Make sure to confirm the user.

### Part 2: Configure Your Application Environment

**For Local Development:**

1.  **Get a Gemini API Key:**
    *   Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your API key for the Gemini AI bot.

2.  **Create `.env` file:**
    *   In the root directory of the project, create a file named `.env`.
    *   Copy the following content into it, replacing the placeholder values with your actual keys from Supabase and Google.

    ```env
    # .env file for local development

    # Get this from your Supabase Project Settings -> API
    VITE_SUPABASE_URL="https://your-project-url.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-public-anon-key"

    # Get this from Google AI Studio
    VITE_API_KEY="your-gemini-api-key"
    ```

3.  **Run the App:**
    *   Open your terminal, run `npm install`, and then `npm run dev`. Your portfolio should now be running locally.

**For Deployment (Vercel, Netlify, etc.):**

1.  **Push Code to GitHub:** Make sure your latest code is on a GitHub repository.

2.  **Import Project to Host:**
    *   Log in to your hosting provider (e.g., Vercel) and import your GitHub repository.
    *   The build settings should be automatically detected (Vite, `npm run build`, output directory `dist`).

3.  **Add Environment Variables:**
    *   In your host's project settings dashboard, navigate to the Environment Variables section.
    *   Add the following variables. These are **required** for the live app to work.

    | Key                       | Value                                         |
    | ------------------------- | --------------------------------------------- |
    | `VITE_SUPABASE_URL`       | Your Supabase project URL.                    |
    | `VITE_SUPABASE_ANON_KEY`  | Your Supabase `anon` public key.              |
    | `VITE_API_KEY`            | Your Google Gemini API Key (for the AI Bot).  |

4.  **Deploy:**
    *   Trigger a new deployment. It will use the environment variables you just set.
    *   Your site is now live! You can log in to the admin panel using the email and password you created in Supabase.


Option 1: Clone into a temp folder, then swap contents
cd ~/Desktop  # or any neutral location
git clone https://github.com/portfolio.git temp-repo
cd temp-repo
rm -rf *      # wipe contents safely

# Then copy your React build into temp-repo
cp -r ~/path-to-your-react-app/* .

Option 2: Use your current React app and link it directly
cd /path/to/your-react-app

# Clean Git slate (if needed)
rm -rf .git
git init
git remote add origin https://github.com/portfolio.git
git add .
git commit -m "Fresh React deployment"
git push -u origin main --force

