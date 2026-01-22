# Praxis Nexus

## Overview
Praxis Nexus is an academic inquiry journal web application for presenting EdD (Doctor of Education) research on AI's Ecological and Economic Entanglements. The journal presents Felix Abayomi's personal inquiry on "AI, Conservation, and the Reconfiguration of Human–Wildlife Relations."

## Current State
- Fully functional academic journal with elegant, scholarly design
- Month-based structure for organizing inquiry progress
- Complete Month 1 content: "Framing the Inquiry"
- Reference management with DOI linking

## Project Architecture

### Frontend (React + Vite)
- **client/src/App.tsx** - Main app with routing and providers
- **client/src/pages/Home.tsx** - Main journal page with sidebar layout
- **client/src/components/**
  - `ThemeProvider.tsx` - Dark/light theme management
  - `ThemeToggle.tsx` - Theme toggle button
  - `JournalSidebar.tsx` - Navigation sidebar for months/sections
  - `JournalContent.tsx` - Main content display area
- **client/src/lib/journalData.ts** - Journal content data

### Backend (Express)
- **server/routes.ts** - API endpoints for journal data
- **server/storage.ts** - In-memory storage for journal entries

### Shared
- **shared/schema.ts** - TypeScript interfaces for journal data types

## Design System
- Forest green and warm earth tones (conservation/ecology theme)
- Serif typography (Source Serif 4, Playfair Display) for academic feel
- Clean, minimal interface with spacious reading areas
- Drop cap styling for introduction
- Card-based section layout for month content

## Key Features
- Collapsible sidebar navigation
- Dark/light theme support
- Monthly inquiry sections with themed content
- Academic reference list with DOI links
- Responsive design for all devices

## Adding New Months
To add new months, update the `journalData` object in `client/src/lib/journalData.ts` and `server/storage.ts` with new month entries following the existing structure.
