# MindMesh Labs Portfolio

A full-featured portfolio platform for developers to showcase their work and capture leads. Built with React, TypeScript, and Tailwind CSS, and designed to be deployed as a static site.

## Features

- **Public Portfolio:** Showcase projects with descriptions, tech stacks, and complexity ratings.
- **Admin Dashboard:** A secure area to manage projects, view captured leads, and update site settings.
- **Lead Capture:** Forms to capture contact information from potential clients.
- **Dynamic Filtering & Sorting:** Easily find projects on the public page.
- **Dark/Light Mode:** Theme toggling for user preference.
- **Responsive Design:** Looks great on all devices.

## Tech Stack (As-is from AI Studio)

- **Framework:** React 19
- **Language:** TypeScript (TSX)
- **Styling:** Tailwind CSS (via CDN)
- **Dependencies:** Loaded via `importmap` and `esm.sh`.

> **[IMPORTANT] Deployment Prerequisite**
>
> This project is now configured to run with a professional build process using Vite.
>
> **To deploy this on a standard hosting service like Netlify, follow the guide below.**

---

## Deployment Guide: From Local Code to Live on Netlify

This guide is in three main parts:
1.  **Project Setup:** Adding a professional build process using Vite. (This has been done for you).
2.  **GitHub:** Pushing your production-ready code to a repository.
3.  **Netlify:** Deploying your site from your GitHub repository.

### Part 1: Setting Up the Project for Production (with Vite)

These steps convert the project to use a standard, production-grade build system. This has already been applied to the codebase.

#### Prerequisites
- **VS Code** (or your preferred editor)
- **Node.js and npm:** Download from [nodejs.org](https://nodejs.org/).

#### Step-by-Step Instructions

1.  **Open a terminal** in your project's root directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3. **Test your setup**: Run `npm run dev` in the terminal. The site should now be running on a local development server (e.g., `http://localhost:5173`).

### Part 2: Push Project to GitHub

1.  **Create a new GitHub Repository:**
    - Go to [GitHub](https://github.com/) and create a new, empty repository.

2.  **Initialize Git and Commit:** In your terminal:
    ```bash
    git init -b main
    git add .
    git commit -m "Initial commit: Setup production-ready portfolio"
    ```

3.  **Link and Push:**
    ```bash
    # Replace with your repository URL
    git remote add origin https://github.com/your-username/your-repo-name.git
    git push -u origin main
    ```

### Part 3: Deploy on Netlify

1.  **Log in to Netlify** and select "Add new site" > "Import an existing project".
2.  **Connect to GitHub** and authorize it.
3.  **Select your repository**.
4.  **Configure Build Settings**. Netlify should auto-detect Vite. Verify the settings are:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
5.  **Add Environment Variables:** In your site settings on Netlify, go to "Site configuration" > "Build & deploy" > "Environment". Click "Edit variables" and add a new variable:
    - **Key:** `API_KEY`
    - **Value:** Your Google Gemini API Key.
6.  Click **"Deploy site"**.

Your portfolio is now live! Netlify will automatically redeploy the site every time you push new changes to your `main` branch on GitHub.