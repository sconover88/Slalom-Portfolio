# Requirements Document

## Introduction

A personal UX portfolio website for Scott Conover, a UX designer at Slalom. The portfolio showcases UX project work done at Slalom for internal teams and clients. The site is built with Next.js, TypeScript, Tailwind CSS v4, and shadcn/ui, deployed publicly via Vercel connected to a GitHub repository. The site requires no authentication and is designed to be maintained by a non-developer through markdown content files, image folders, and a styling prompt file — with all code changes handled by an AI assistant (Kiro). The architecture prioritizes ease of extensibility so new projects can be added over time with minimal technical knowledge.

## Glossary

- **Portfolio_Site**: The Next.js web application that renders Scott Conover's UX portfolio, including all pages, navigation, and content rendering logic.
- **Home_Page**: The landing page of the Portfolio_Site displaying project cards and a call-to-action linking to an external presentation deck.
- **About_Page**: A page on the Portfolio_Site displaying Scott Conover's bio, skills, tools, and methods.
- **Project_Page**: An individual page on the Portfolio_Site that renders the full case study content for a single UX project.
- **Project_Card**: A clickable thumbnail component on the Home_Page that links to a corresponding Project_Page.
- **Markdown_Template**: A structured markdown file located in the content directory that defines the content for a single project, including title, description, role, tools, problem statement, process, deliverables, metrics, and image references.
- **Styling_Prompt_File**: A dedicated text file that contains a natural-language description of the desired visual aesthetic for the Portfolio_Site, read by the AI assistant to apply consistent styling.
- **Content_Directory**: The folder structure within the repository where Markdown_Templates and project images are stored.
- **Image_Folder**: A single directory within the Content_Directory where all project images and graphics are stored.
- **Header_Nav**: The persistent navigation bar displayed at the top of every page on the Portfolio_Site.
- **CTA_Banner**: A call-to-action element displayed prominently on the Home_Page linking to an external PowerPoint presentation deck.
- **README_File**: A markdown file at the repository root that explains the portfolio's purpose, architecture, and provides detailed non-developer instructions for content management.
- **Content_Renderer**: The component within the Portfolio_Site responsible for parsing Markdown_Templates and rendering them as styled HTML on Project_Pages.
- **Image_Optimizer**: The image processing pipeline that resizes and optimizes images from the Image_Folder for web display.

## Requirements

### Requirement 1: Home Page with Project Gallery

**User Story:** As Scott Conover, I want a home page that displays my UX projects as visual thumbnail cards, so that visitors can quickly browse my portfolio and navigate to individual project case studies.

#### Acceptance Criteria

1. WHEN a visitor loads the root URL, THE Portfolio_Site SHALL render the Home_Page displaying all published Project_Cards in a responsive grid layout.
2. THE Home_Page SHALL display each Project_Card with a thumbnail image, project title, and a brief description sourced from the corresponding Markdown_Template.
3. WHEN a visitor clicks a Project_Card, THE Portfolio_Site SHALL navigate to the corresponding Project_Page.
4. THE Home_Page SHALL display a CTA_Banner at the top of the page content linking to an external PowerPoint presentation deck URL.
5. WHEN a visitor clicks the CTA_Banner, THE Portfolio_Site SHALL open the external PowerPoint deck URL in a new browser tab.
6. THE Header_Nav SHALL display a link to the same external PowerPoint presentation deck URL on every page of the Portfolio_Site.
7. WHEN a visitor resizes the browser window, THE Home_Page SHALL reflow the Project_Card grid to maintain readability across desktop, tablet, and mobile viewport widths.

### Requirement 2: About Me Page

**User Story:** As Scott Conover, I want an About Me page that presents my professional bio, skills, tools, and methods, so that visitors understand my background and expertise as a UX designer.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include an About_Page accessible via the Header_Nav.
2. THE About_Page SHALL display Scott Conover's professional biography as a text section.
3. THE About_Page SHALL display a list of UX skills.
4. THE About_Page SHALL display a list of tools used in UX work.
5. THE About_Page SHALL display a list of UX methods and processes.
6. THE About_Page SHALL render all content from a dedicated markdown or configuration file within the Content_Directory.
7. THE About_Page SHALL NOT include a resume download link, a contact form, or any form-based input elements.

### Requirement 3: Individual Project Pages

**User Story:** As Scott Conover, I want individual project pages that present the full case study for each UX project, so that visitors can understand the problem, process, and outcomes of my work.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL generate one Project_Page for each Markdown_Template present in the Content_Directory.
2. THE Project_Page SHALL display the following sections sourced from the Markdown_Template: project title, project description, role and responsibilities, tools and methods used, problem statement or challenge, process (including research, wireframes, prototyping, and testing), final deliverables or outcomes, metrics or impact, and images or graphics.
3. WHEN a Markdown_Template references an image filename, THE Content_Renderer SHALL resolve the image from the Image_Folder and display it on the Project_Page.
4. WHEN a new Markdown_Template is added to the Content_Directory, THE Portfolio_Site SHALL generate a new Project_Page and a corresponding Project_Card on the Home_Page after the next build.
5. THE Portfolio_Site SHALL initially include two Project_Pages corresponding to two Markdown_Templates provided by Scott Conover.
6. IF a Markdown_Template contains a missing or malformed required section, THEN THE Content_Renderer SHALL render the available sections and omit the missing section without causing a build failure.

### Requirement 4: Markdown-Based Content Management

**User Story:** As Scott Conover (a non-developer), I want to manage all project content through simple markdown files and an image folder, so that I can add and update portfolio content without editing frontend code.

#### Acceptance Criteria

1. THE Content_Directory SHALL contain a Markdown_Template file for each project, following a documented structure with frontmatter fields for title, description, role, tools, problem statement, process, deliverables, metrics, and image references.
2. THE Content_Directory SHALL include a template Markdown_Template file with placeholder content and inline comments explaining each section, so that Scott Conover can duplicate it to create new project entries.
3. THE Image_Folder SHALL serve as the single location for all project images and graphics used across the Portfolio_Site.
4. WHEN Scott Conover provides images in the Image_Folder, THE Image_Optimizer SHALL resize and optimize those images for web display during the build process.
5. THE Portfolio_Site SHALL use Next.js Image component or equivalent optimization to serve images in modern formats with responsive sizing.

### Requirement 5: Styling Prompt-Driven Design

**User Story:** As Scott Conover, I want to define the visual aesthetic of my portfolio through a natural-language styling prompt file, so that the AI assistant can apply a consistent, professional design without me editing CSS or code.

#### Acceptance Criteria

1. THE Content_Directory SHALL contain a Styling_Prompt_File where Scott Conover can describe the desired visual aesthetic in natural language.
2. THE Portfolio_Site SHALL use Tailwind CSS v4 for all styling.
3. THE Portfolio_Site SHALL use shadcn/ui components as the base component library.
4. WHEN the AI assistant reads the Styling_Prompt_File, THE AI assistant SHALL apply the described aesthetic to the Portfolio_Site's theme, colors, typography, spacing, and layout.
5. WHEN Scott Conover updates the Styling_Prompt_File and requests a styling refresh, THE AI assistant SHALL update the Portfolio_Site styling to reflect the new prompt.

### Requirement 6: Navigation and Site Structure

**User Story:** As a visitor, I want clear and consistent navigation across the portfolio, so that I can easily move between the home page, about page, and individual project pages.

#### Acceptance Criteria

1. THE Header_Nav SHALL be displayed on every page of the Portfolio_Site.
2. THE Header_Nav SHALL include links to the Home_Page and the About_Page.
3. THE Header_Nav SHALL include a link to the external PowerPoint presentation deck that opens in a new browser tab.
4. WHEN a visitor is on a Project_Page, THE Portfolio_Site SHALL provide a way to navigate back to the Home_Page.
5. THE Portfolio_Site SHALL include a footer on every page with attribution text (e.g., "Scott Conover — UX Designer at Slalom").
6. WHEN a visitor navigates between pages, THE Portfolio_Site SHALL use client-side navigation for fast page transitions without full page reloads.

### Requirement 7: Responsive Design and Accessibility

**User Story:** As a visitor on any device, I want the portfolio to be visually polished and accessible, so that I can view Scott Conover's work on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render correctly on viewport widths from 320px to 2560px.
2. THE Portfolio_Site SHALL use responsive typography and spacing that scales appropriately across viewport sizes.
3. THE Portfolio_Site SHALL meet WCAG 2.1 Level AA color contrast requirements for all text content.
4. THE Portfolio_Site SHALL provide descriptive alt text for all images, sourced from the Markdown_Template or Image_Folder metadata.
5. THE Portfolio_Site SHALL be navigable using keyboard-only input.
6. THE Portfolio_Site SHALL use semantic HTML elements (nav, main, article, section, header, footer) for page structure.

### Requirement 8: Deployment and Repository Setup

**User Story:** As Scott Conover, I want the portfolio deployed publicly via Vercel connected to a GitHub repository, so that the site is accessible on the internet and updates automatically when content changes are pushed.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be deployable to Vercel via connection to a GitHub repository.
2. WHEN changes are pushed to the main branch of the GitHub repository, THE Vercel deployment SHALL automatically trigger a new build and deploy the updated Portfolio_Site.
3. THE Portfolio_Site SHALL be accessible via a public URL provided by Vercel.
4. THE Portfolio_Site SHALL build successfully using Next.js static or server-side generation without requiring a running database for core content rendering.
5. THE Portfolio_Site SHALL NOT require authentication for any visitor-facing page.

### Requirement 9: Non-Developer Documentation

**User Story:** As Scott Conover (a non-developer), I want a comprehensive README file with detailed instructions, so that I understand how the portfolio works and how to request content changes through the AI assistant.

#### Acceptance Criteria

1. THE README_File SHALL explain the purpose and goals of the Portfolio_Site.
2. THE README_File SHALL describe the overall architecture and technology stack in non-technical language.
3. THE README_File SHALL provide step-by-step instructions for adding a new project, including how to create a Markdown_Template from the template, how to add images to the Image_Folder, and how to request the AI assistant to build the page.
4. THE README_File SHALL provide instructions for updating the Styling_Prompt_File and requesting a styling refresh.
5. THE README_File SHALL provide instructions for deploying updates via the GitHub-to-Vercel pipeline, written for a non-developer audience.
6. THE README_File SHALL include a section explaining the folder structure of the Content_Directory with descriptions of each file and folder.
7. THE README_File SHALL avoid technical jargon and use plain language throughout, with screenshots or diagrams where helpful.

### Requirement 10: Extensibility for Future Projects

**User Story:** As Scott Conover, I want the portfolio architecture to make it simple to add new projects over time, so that my portfolio grows as I complete more UX work at Slalom.

#### Acceptance Criteria

1. WHEN a new Markdown_Template is added to the Content_Directory following the documented template structure, THE Portfolio_Site SHALL automatically generate a new Project_Page and Project_Card without requiring changes to any other file.
2. THE Portfolio_Site SHALL support an unlimited number of Project_Pages, constrained only by the number of Markdown_Templates in the Content_Directory.
3. THE Portfolio_Site SHALL order Project_Cards on the Home_Page based on a date or order field specified in the Markdown_Template frontmatter.
4. WHEN a Markdown_Template is removed from the Content_Directory, THE Portfolio_Site SHALL remove the corresponding Project_Page and Project_Card after the next build.
