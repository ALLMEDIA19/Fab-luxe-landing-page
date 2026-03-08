# PRD — Fab Luxe by Forbes Global Properties Landing Page

## Original Problem Statement
Summarizing the provided data in these files, make a luxury real estate selling landing page, with a pop up CTA to gather client's information, use bullets points whatever feels like more worthy for customer's interaction and interest. It is important to give it a rich look to attract high ticket client. Price starts at 2.97CR, just in case it's not mentioned in the files.

## User Choices Captured
- Source content: Use attached files in chat
- Brand: Fab Luxe by Forbes Global Properties
- Popup fields: Name, Phone, Budget, Preferred Callback Time
- Post-submit behavior: Success message only

## Architecture Decisions
- Stack: React frontend + FastAPI backend + MongoDB
- Frontend uses process.env.REACT_APP_BACKEND_URL for API calls (no hardcoded API URL)
- Backend persists leads in Mongo collection with explicit _id exclusion in responses to avoid ObjectId serialization issues
- Design system guided by /app/design_guidelines.json (Deep Emerald + Forbes Gold + Warm Cream, Playfair + Manrope, rich luxury visual language)

## What Has Been Implemented
- Luxury single-page landing experience with premium hero, metrics, bento highlights, lifestyle bullets, configuration table, location/connectivity, and final CTA
- Content summarized from customer deck and floor plan PDFs (AQI-managed positioning, tower/spec details, amenities, connectivity, unit data)
- Price emphasis implemented: Starts at ₹2.97 CR
- Multi-entry popup lead CTA integrated (header, hero, final section, sticky desktop/mobile CTA)
- Popup form collects required 4 fields and shows success state on submit
- Toast notifications via sonner for validation/success/error
- Backend lead APIs implemented: create, list, get by id, update, delete (/api/leads)
- Desktop sticky CTA conflict fixed by repositioning CTA to avoid overlay interference
- Added data-testid attributes across interactive and critical elements for robust UI testing

## Validation Completed
- Self-tested backend APIs via curl: create/get/list success
- UI tested via screenshot automation: popup open + submit success (desktop and mobile sticky CTA paths)
- Lint status: Python and JavaScript checks passed
- Testing agent results reviewed; reported sticky CTA issue was fixed and self-retested

## Prioritized Backlog
### P0
- Add server-side input validation rules (phone format, budget normalization, anti-spam checks)
- Build basic internal leads dashboard page with filtering/export

### P1
- Add richer project media section (verified renders/floorplan image carousel)
- Add scroll-triggered section animations with reduced-motion accessibility fallback

### P2
- Add A/B variants for hero copy and CTA labels
- Add analytics events for CTA click heatmap and form completion funnel

## Next Tasks
1. Implement lead quality validation + anti-spam controls
2. Add admin-facing lead management UI
3. Add conversion analytics events for CTAs and form stages
