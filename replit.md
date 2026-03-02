# Praxis Nexus

## Overview
Praxis Nexus is an academic research hub web application presenting multiple research projects by Felix Olusola Abayomi. The platform supports multiple projects with individual access codes and distinct visual layouts.

## Current State
- Multi-project architecture with main hub landing page
- Two projects configured:
  1. **EdD Inquiry on AI's Ecological and Economic Entanglements** (Active) - Access code: 150920
  2. **Quasi-Qualitative Project** (Active) - Access code: QUASI2026
- Each project has its own unique visual design and layout
- Fully functional academic journal for EdD project with elegant, scholarly design
- Fully functional quasi-qualitative methodology project with accordion-based layout
- PWA support for home screen installation
- Mobile-responsive design

## Navigation Flow
1. **Project Hub (/)** - Main entry point showing all project cards
2. **EdD Inquiry (/edd-inquiry)** - Forest green theme, serif typography
   - Landing Page → Access Code → Welcome Section → Content
   - Three cards: Overview, Monthly Inquiries, References
3. **Quasi-Qualitative (/quasi-qualitative)** - Violet/purple theme, sans-serif typography
   - Landing Page → Access Code → Hub Page (three cards) → Content
   - **Card 1: Quasi-Qualitative Research** → Two Views (Reasoning / Paper)
     - **Reasoning View**: Research Question + 7 accordion sections + Tools (font size, audio, presentation, search)
     - **Paper View**: AI Dissertation Generator with chapter-by-chapter generation
   - **Card 2: Semi-Structured Interview Protocol** (Appendix A) → Dynamic view
     - Shows read-only protocol AND submitted responses with transcript editing in one view
     - Includes "Open Fillable Form" button linking to /interview
     - Responses auto-display below the protocol as they are submitted
   - **Card 3: Coding Sheet and Codebook** (Appendix B) → Interactive fillable tool
     - Per-participant coding sheets (Participant A/B profiles)
     - **"Import from Responses" button** — auto-populates coding sheets from interview responses
     - Option summary for structured responses
     - Qualitative Evidence Log (add excerpts, codes, analytic memos)
     - B2 Codebook: 8 domains, 40+ open coding categories
     - B3 Theme Development Worksheet (3-6 themes)
     - B4 Analytic Integrity Note
     - Data saved to localStorage
   - **Interview Responses Viewer** — View all submitted responses with transcript editing
     - Expandable response cards per participant
     - Add/edit full interview transcripts for recorded oral answers
     - Transcripts stored in PostgreSQL alongside form responses
   - **Public Interview Form (/interview)** — Fillable, dynamic form for participants
     - 12 structured questions with checkboxes, radio buttons, ranking selects, textareas
     - Consent and participant ID required
     - Responses stored in PostgreSQL `interview_responses` table
     - No access code required (publicly shareable link)
   - **AI Paper Generator** now fetches interview responses + transcripts to include in generation
4. **Doctoral Portfolio (/portfolio)** - Blue/navy theme, serif typography
   - Landing Page → Access Code (PORTFOLIO2026) → Two Views (Portfolio / Paper)
   - **Portfolio View**: Browse three strands with expandable artifacts and reflections
     - **Knowledge Strand**: Paradigm Paper, Theoretical Framework, Literature Review, Research Design
     - **Practice Strand**: Concept Papers, HWICRM Prototype Design Plan
     - **Self-in-Context Strand**: Professional Reflection, Leadership Philosophy, Ecological Ethics
     - Reading time estimates per strand and overall
     - Per-strand AI Presentation mode with 5 templates
   - **Paper View**: AI Strand Synthesis Generator
     - Generate formal academic syntheses for each strand
     - Citation matching using master reference list (21 APA sources)
     - Shows only sources cited in generated syntheses
   - AI Audio Narration (PortfolioAIAudio component) using OpenAI TTS
   - Search functionality (Ctrl+K) across all content
   - Appendix section with supplementary materials
5. **Integrated Essay (/integrated-essay)** - Teal/emerald theme, elegant typography
   - Landing Page → Access Code (ESSAY2026) → Two Views (Essay / Generator)
   - **Essay View**: Full pre-written content with expandable sections
     - 8 sections: Introduction, Knowledge Strand, Practice Strand, Self-in-Context, Strand Synthesis, Dissertation Connection, Growth Trajectory, Conclusion
     - Reading time estimates per section and overall
     - Per-section AI Presentation mode with 5 templates
   - **Generator View**: AI Section Generator
     - Generate AI-enhanced academic writing for each section
     - Section-by-section or bulk generation with citation matching
     - Shows only sources cited in generated content
   - AI Audio Narration (EssayAIAudio component) using OpenAI TTS
   - Search functionality (Ctrl+K) across all content
   - 31 APA 7th edition references

6. **Nature Ethics Research Institute** (/nesri) - Active, no access code
   - Amber/gold theme
   - Ethical frameworks for environmental stewardship
   - Six topic cards: Environmental Ethics, Ecological Stewardship, Human–Nature Relationships, Environmental Justice, Community-Centred Conservation, Research and Scholarship
7. **Wildlife of Africa Conservation Initiative** (/waci) - Active, no access code
   - Orange theme
   - Conservation challenges across the African continent
   - Six topic cards: Wildlife Protection, Habitat Preservation, Community Engagement, Human–Wildlife Coexistence, Sustainable Livelihoods, Research and Education

## Project Architecture

### Routes
- `/` - ProjectHub.tsx - Main hub with project selection cards
- `/edd-inquiry` - Home.tsx + Landing.tsx - EdD AI Inquiry Journal
- `/quasi-qualitative` - QuasiQualitative.tsx - Quasi-Qualitative Project

### Frontend (React + Vite)
- **client/src/App.tsx** - Main app with routing and providers
- **client/src/pages/ProjectHub.tsx** - Main project hub landing page
- **client/src/pages/Home.tsx** - EdD journal page with landing, welcome, and sidebar layout
- **client/src/pages/Landing.tsx** - EdD project landing page with access code
- **client/src/pages/QuasiQualitative.tsx** - Quasi-Qualitative project (different layout)
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
- **server/replit_integrations/ai-presentation.ts** - OpenAI integration for AI insights and slide headings
- **server/replit_integrations/tts.ts** - OpenAI TTS for audio narration (CarPlay compatible)
- **server/replit_integrations/dissertation.ts** - AI dissertation chapter generation

### Shared
- **shared/schema.ts** - TypeScript interfaces for journal data types

## Design System

### EdD Inquiry Project
- Forest green (#0f4c3a) and warm earth tones (conservation/ecology theme)
- Serif typography (Source Serif 4, Playfair Display) for academic feel
- Leaf icon branding
- Clean, minimal interface with spacious reading areas
- Drop cap styling for introduction

### Quasi-Qualitative Project
- Violet/purple color scheme
- Sans-serif typography for modern feel
- FlaskConical icon branding
- Different gradient backgrounds
- **Two-View System** accessible via tabs:
  1. **Reasoning View**: 
     - Accordion-based expandable sections
     - Research Question card prominently displayed
     - Q&A format for each section with question icons
     - Expand All / Collapse All functionality
     - Tools: Font size control, TTS, AI Audio, Presentation mode, Search (Ctrl+K)
  2. **Paper View**:
     - AI Dissertation Generator
     - Transforms Q&A content into formal academic chapters
     - Supports Proposal format (Chapters 1-3) or Full Dissertation (Chapters 1-6)
     - Generate individual chapters or all at once
     - **Citation Matching**: AI uses in-text citations from master reference list
     - **Dynamic References**: Shows only sources cited in generated chapters
     - Print and Download functionality (includes only cited sources)
- 7 main sections: Theoretical Framework, Research Design, Participants, Data Collection, Data Interpretation, Ethics, Chapter Summary
- References section with APA 7th edition formatting and external links

## Key Features (EdD Inquiry)
- Collapsible sidebar navigation with reading time estimates
- Dark/light theme support
- Monthly inquiry sections with themed content
- Academic reference list with DOI links (APA 7th edition format)
- Responsive design for all devices
- AI-enhanced presentation mode with 5 templates and auto-generated slide headings
- Full-text search (Ctrl+K / Cmd+K)
- Text-to-speech audio narration (Web Speech API)
- AI audio narration via OpenAI TTS (CarPlay/Android Auto/Bluetooth compatible) with unlimited length support
- Audio download as MP3 for podcast/sharing
- Print/PDF export with clean styling
- PWA support for home screen installation
- Access code protection (code: 150920) for journal entry
- "Keep me signed in" option for persistent access
- Adjustable font size (14px-20px) with localStorage persistence - affects body text only
- AI Citation Assistant for checking statements that need citations

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

## APA 7th Edition References
- References are formatted in proper APA 7th edition style
- Journal articles: Title in regular text, journal name in italics
- Books: Title in italics, publisher in regular text
- Full DOI URLs included (https://doi.org/...)
- Hanging indent formatting
- References sorted alphabetically by first author's last name
- Each reference has a `type` field: 'journal', 'book', 'chapter', 'report', 'website'

## AI Citation Assistant
- **Hidden from readers by default** - only visible in "Author Mode"
- Toggle Author Mode: Press **Ctrl+Shift+C** (Windows/Linux) or **Cmd+Shift+C** (Mac)
- Author Mode persists in localStorage until toggled off
- Analyzes text for statements that may need citations
- Checks APA 7th format in existing citations
- Provides suggestions for finding sources
- Maximum 15,000 characters per analysis

## Adding New Projects
To add a new project:
1. Create a new page component in `client/src/pages/`
2. Add the route to `client/src/App.tsx`
3. Add project card to `client/src/pages/ProjectHub.tsx`
4. Each project should have its own unique:
   - Access code (stored in the project page)
   - Visual design/color scheme
   - Typography choices
   - Content structure

## Adding New Months (EdD Inquiry)
To add new months, update the `journalData` object in `client/src/lib/journalData.ts` and `server/storage.ts` with new month entries following the existing structure.

## Master Reference List
The Quasi-Qualitative project uses a master reference list (26 sources) for AI-powered citation matching. Located in `client/src/lib/quasiData.ts`, the AI draws from these sources when generating dissertation chapters. Sources cover:
- Human-wildlife conflict research (Abrahms et al., Mekonen, Pooley et al., Redpath et al.)
- Conservation and biodiversity (Arts et al., Knight et al., Stephenson et al.)
- Theoretical frameworks (Bronfenbrenner, Naess, Leopold, Callicott)
- Ecofeminism (Gaard, Plumwood, Warren)
- Indigenous knowledge (Domínguez & Luoma, Tom et al.)
- AI and technology ethics (Gregg et al., Haleem et al., Stilgoe et al.)
- Research methodology (Grant & Osanloo, Vom Brocke et al.)

## Adding References
When adding new references to `journalData.ts`, include the `type` field:
```typescript
{
  id: "ref-new",
  authors: "Author, A. B., & Author, C. D.",
  year: "2025",
  title: "Article title here",
  source: "Journal Name, 12(3), 45-67",
  doi: "10.xxxx/xxxxx",
  type: "journal" // or "book", "chapter", "report", "website"
}
```
