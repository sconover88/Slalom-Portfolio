# Scott Conover — UX Portfolio

Welcome to your portfolio site! This is a personal website that showcases your UX design work at Slalom. It's built to be easy to manage — you don't need to write any code. Just edit simple text files, and Kiro takes care of the rest.

## What This Is

This is your professional UX portfolio website. Here's what it does:

- **Showcases your UX work** — Each project you've done at Slalom gets its own page with the full case study: the problem, your process, deliverables, and results.
- **Easy to grow over time** — When you finish a new project, adding it to the site is straightforward. No coding required.
- **Polished, professional design** — The site uses a "Playful Geometric" visual style with warm colors, friendly typography, and a clean layout that lets your work shine.
- **Publicly accessible** — The site is live on the internet via Vercel, so anyone with the link can view your portfolio.
- **No coding required** — All your content lives in simple text files. You tell Kiro what you want, and Kiro handles the technical side.

## How It Works

The site reads simple text files (called markdown files) and images to build your pages. Think of it like a recipe:

1. **You write the content** in plain text files — project titles, descriptions, your process, results, and so on.
2. **You drop images** into a folder.
3. **You tell Kiro** what you'd like to change or add.
4. **Kiro writes the code** and pushes it to GitHub (a place where the code is stored).
5. **The site automatically updates** on Vercel (the service that hosts your site) within a couple of minutes.

That's it. You focus on the content, Kiro handles the code, and the site takes care of itself.

## Folder Structure

Here's where everything lives. You only need to care about the `content/` and `public/images/` folders — that's where your content and images go.

```
content/
├── projects/           ← Your project case studies (one file per project)
│   ├── _template.md    ← Copy this to start a new project
│   ├── project-one.md  ← Example project
│   └── project-two.md  ← Example project
├── about.md            ← Your About Me page content
└── styling-prompt.md   ← The design style instructions for Kiro

public/
└── images/             ← All your project images go here
```

Here's what each piece does:

- **content/projects/** — This folder holds one text file for each project on your site. Each file contains the project title, description, your role, tools, process, and results.
- **content/projects/_template.md** — A starter template. When you want to add a new project, Kiro copies this file and fills in your details.
- **content/about.md** — The content for your About Me page: your bio, skills, tools, and methods.
- **content/styling-prompt.md** — A description of how the site should look and feel. Kiro reads this to apply the visual design. You can update it if you want a different style.
- **public/images/** — All the images used across your site go here: project thumbnails, wireframes, screenshots, and anything else visual.

## How to Add a New Project

Adding a new project is a conversation with Kiro:

1. **Tell Kiro**: "I want to add a new project called [name]"
2. **Kiro creates a new file** from the template with the right structure
3. **Fill in the details** — project title, description, your role, tools used, the problem you solved, your process, deliverables, and results
4. **Drop your images** into the `public/images/` folder
5. **Tell Kiro**: "Build the new project page"
6. **Kiro handles the rest** — it writes the code, and the site updates automatically

Your new project will appear as a card on the home page and get its own dedicated page with the full case study.

## How to Update the About Page

Your About Me page pulls its content from `content/about.md`. To make changes:

1. Open `content/about.md` and edit your bio, skills, tools, or methods
2. Tell Kiro to rebuild the site

Kiro will apply your changes and the updated About page will go live.

## How to Change the Design Style

The look and feel of your site is guided by `content/styling-prompt.md`. This file describes the visual style in plain language — colors, fonts, spacing, and overall vibe.

If you want a different look:

1. Open `content/styling-prompt.md`
2. Describe the new style you'd like (or edit the existing description)
3. Tell Kiro: "Apply the new styling"

Kiro will read your updated style description and adjust the site's design to match.

## How to Update the Presentation Deck Link

Your site includes a link to an external presentation deck (the button on the home page and in the navigation). To change where that link points:

1. Tell Kiro the new URL — for example: "Update the deck link to https://my-new-deck-url.com"
2. Kiro will update `lib/config.ts` with the new URL
3. The site rebuilds and the link is updated everywhere

## How to Deploy

The good news: deployment is mostly automatic. Here's how it works:

- **Your site is connected to GitHub through Vercel.** GitHub stores the code, and Vercel turns it into a live website.
- **When Kiro pushes changes to GitHub, the site automatically updates.** You don't need to do anything — Vercel detects the changes and rebuilds the site within a couple of minutes.
- **You can also trigger a deploy manually** from the Vercel dashboard if needed.
- **Your site URL is provided by Vercel.** You can find it in your Vercel account settings, and you can set up a custom domain if you'd like.

In short: tell Kiro what you want changed, Kiro pushes the update, and the site goes live on its own.

## Goals

This portfolio is designed to:

- **Showcase your UX design work** at Slalom for internal teams and clients
- **Make it easy to add new projects** as you complete more work
- **Present a professional, polished portfolio** with minimal effort on your part
- **Keep everything maintainable** without needing to write code

## Tech Stack

For the curious, here's what powers the site behind the scenes:

- **Next.js** — A popular framework for building fast, modern websites
- **Tailwind CSS and shadcn/ui** — Tools that make the site look polished and consistent
- **Vercel** — The hosting service that keeps your site live on the internet (free, fast, and reliable)
- **Markdown files** — Simple text files that hold all your content, so you never need to touch code

You don't need to understand any of these to manage your portfolio. They're just the building blocks that Kiro works with.
