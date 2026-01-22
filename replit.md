# Praxis Nexus

## Overview
Praxis Nexus is an academic inquiry journal web application for presenting EdD (Doctor of Education) research on AI's Ecological and Economic Entanglements. The journal presents Felix Olusola Abayomi's personal inquiry on "AI, Conservation, and the Reconfiguration of Human–Wildlife Relations."

## Current State
- Fully functional academic journal with elegant, scholarly design
- Landing page with inquiry title, personal inquiry subtitle, and author name
- Welcome section with Overview and Monthly Inquiries navigation cards
- Month-based structure for organizing inquiry progress
- Complete Month 1 content: "Framing the Inquiry"
- Reference management with DOI linking
- AI-enhanced presentation mode with 5 visual templates
- PWA support for home screen installation
- Mobile-responsive design with app name visible on all screen sizes
- Contact form with dual email system (notification + sender confirmation)

## Navigation Flow
1. **Landing Page** - Entry point showing inquiry title and "Enter Journal" button
2. **Welcome Section** - Two cards: Overview (leads to Introduction) and Monthly Inquiries (leads to Month 1)
3. **Journal Content** - Introduction, References, and Monthly Inquiry sections
4. Clicking "Praxis Nexus" in header returns to landing page

## Project Architecture

### Frontend (React + Vite)
- **client/src/App.tsx** - Main app with routing and providers
- **client/src/pages/Home.tsx** - Main journal page with landing, welcome, and sidebar layout
- **client/src/pages/Landing.tsx** - Landing page with inquiry title and enter button
- **client/src/components/**
  - `ThemeProvider.tsx` - Dark/light theme management
  - `ThemeToggle.tsx` - Theme toggle button
  - `JournalSidebar.tsx` - Navigation sidebar with reading times
  - `JournalContent.tsx` - Main content display area
  - `PresentationView.tsx` - AI-enhanced presentation slides
  - `TemplateSelector.tsx` - Presentation template chooser
  - `SearchDialog.tsx` - Full-text search across journal
  - `TextToSpeech.tsx` - Audio narration controls
- **client/src/lib/journalData.ts** - Journal content data
- **client/src/lib/journalUtils.ts** - Reading time, search, and TTS utilities

### Backend (Express)
- **server/routes.ts** - API endpoints for journal data
- **server/storage.ts** - In-memory storage for journal entries
- **server/replit_integrations/ai-presentation.ts** - OpenAI integration for AI insights

### Shared
- **shared/schema.ts** - TypeScript interfaces for journal data types

## Design System
- Forest green (#0f4c3a) and warm earth tones (conservation/ecology theme)
- Serif typography (Source Serif 4, Playfair Display) for academic feel
- Clean, minimal interface with spacious reading areas
- Drop cap styling for introduction
- Card-based section layout for month content

## Key Features
- Collapsible sidebar navigation with reading time estimates
- Dark/light theme support
- Monthly inquiry sections with themed content
- Academic reference list with DOI links
- Responsive design for all devices
- AI-enhanced presentation mode with 5 templates
- Full-text search (Ctrl+K / Cmd+K)
- Text-to-speech audio narration
- Print/PDF export with clean styling
- PWA support for home screen installation

## Presentation Templates
1. Forest Canopy - Deep greens with layered depth
2. Earth & Sky - Warm sunset gradients
3. Clean Scholar - Minimal academic style
4. Ocean Deep - Cool blue depths
5. Botanical Garden - Vibrant natural palette

## Author Modal & Contact Form
- Clicking author name in footer opens AuthorModal with tabs: About, Privacy, Data Usage, Terms of Use, Contact
- Contact form sends emails to praxinex@gmail.com via Resend integration
- Footer includes copyright "© Felix Abayomi 2026"

## Adding New Months
To add new months, update the `journalData` object in `client/src/lib/journalData.ts` and `server/storage.ts` with new month entries following the existing structure.
