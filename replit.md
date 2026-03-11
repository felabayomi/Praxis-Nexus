# Praxis Nexus

## Overview
Praxis Nexus is an academic research hub web application designed to showcase multiple research projects by Felix Olusola Abayomi. The platform provides secure access to distinct projects, each with its own visual layout, and supports features like academic journal displays, quasi-qualitative research tools, doctoral portfolio presentations, and AI-enhanced content generation. The project aims to consolidate and present scholarly work in an interactive and accessible manner, offering unique digital experiences for different academic outputs.

## User Preferences
I want iterative development.
I prefer detailed explanations.
I want to be asked before making major changes.
Do not make changes to the folder `node_modules`.
Do not make changes to the file `package-lock.json`.
Do not make changes to the file `README.md`.
Do not make changes to the file `CHANGELOG.md`.

## System Architecture

### Core Design Principles
The application utilizes a multi-project architecture with a central hub for project selection. Each project is designed with unique visual themes, typography, and content structures to reflect its specific academic domain. A "Two-View System" is a prominent design pattern in several projects, allowing users to switch between a structured "Reasoning View" and an AI-generated "Paper View."

### Frontend
Developed with React and Vite, the frontend manages dynamic routing, state, and user interactions.
- **Project Hub (`/`)**: Main entry point displaying project cards.
- **Individual Project Pages**: Each project (e.g., `/edd-inquiry`, `/quasi-qualitative`, `/portfolio`, `/integrated-essay`, `/nesri`, `/waci`) has a dedicated page with unique layouts, theming, and functionality.
- **Theming**: Implemented with `ThemeProvider.tsx` for dark/light mode and project-specific color palettes (e.g., forest green for EdD, violet for Quasi-Qualitative, blue for Portfolio).
- **Typography**: Serif fonts (Source Serif 4, Playfair Display) are used for academic projects, while sans-serif fonts are used for modern projects.
- **Responsive Design**: Ensures optimal viewing across various devices.
- **PWA Support**: Allows for home screen installation.

### Backend
An Express.js server handles API requests, data storage, and integrations with external services.
- **API Endpoints**: Defined in `server/routes.ts` for data retrieval and processing.
- **Storage**: In-memory storage (`server/storage.ts`) is used for journal entries.
- **AI Integrations**: Modules for AI-powered presentations, text-to-speech, and dissertation generation are managed server-side.

### Data Management
- **Content Structure**: Project content, including journal data, references, and quasi-qualitative data, is structured using TypeScript interfaces defined in `shared/schema.ts` and stored in `client/src/lib/journalData.ts` and `client/src/lib/quasiData.ts`.
- **Database**: PostgreSQL is used for storing interview responses and transcripts, enabling dynamic content generation and analysis.
- **Local Storage**: Utilized for user preferences like theme, font size, persistent sign-in, and per-participant data for interactive forms.

### Key Features
- **Access Code Protection**: Projects can be secured with unique access codes.
- **AI-Enhanced Content**: Integration with OpenAI for features like presentation slide generation, academic chapter synthesis, strand synthesis, essay section generation, and audio narration (TTS).
- **Interactive Forms**: Dynamic, fillable forms for interview protocols, coding sheets, and consent forms with data persistence and cross-device sync.
- **Citation Management**: AI-powered citation matching using a master reference list with APA 7th edition formatting, dynamically displaying only cited sources.
- **Search Functionality**: Full-text search across project content.
- **Audio Narration**: Text-to-speech capabilities, including OpenAI TTS for high-quality, unlimited audio narration with MP3 download options.
- **Author Mode**: A hidden mode for content creators with tools like an AI Citation Assistant.

## External Dependencies
- **OpenAI API**: Utilized for various AI functionalities including:
    - AI insights and slide heading generation for presentations.
    - Text-to-speech (TTS) for audio narration.
    - Dissertation chapter generation.
    - Strand and essay section synthesis.
    - Citation assistance.
- **PostgreSQL**: Database for storing dynamic data such as interview responses and transcripts.
- **Resend**: For sending emails via the contact form to `praxinex@gmail.com`.