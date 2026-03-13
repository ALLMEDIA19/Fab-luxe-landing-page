# PRD — Fab Luxe by Forbes Global Properties Landing Page

## Original Problem Statement
Summarizing the provided data in these files, make a luxury real estate selling landing page, with a pop up CTA to gather client's information, use bullets points whatever feels like more worthy for customer's interaction and interest. It is important to give it a rich look to attract high ticket client. Price starts at 2.97CR, just in case it's not mentioned in the files.

## User Choices Captured
- Source content: Use attached files in chat
- Brand: Fab Luxe by Forbes Global Properties
- Popup fields: Name, Phone, Budget, Preferred Callback Time
- Post-submit behavior: Success message only
- Theme direction: Red + White brand colors from PDF
- Floor plans: Include BOTH dedicated gallery and configuration tabs
- Additional asks: use project logo from PDF and add richer brochure-level project info
- Added in follow-up: top plain-text nav links (Price List, Location Map, Floor Plan, Amenities)
- Added in follow-up: replace inquiry CTA with CALL NOW behavior; add floating CALL and WhatsApp actions
- Added in follow-up: switch hero to newly uploaded custom image
- Added in follow-up: add footer partner line: ATFL | Authorised Channel Partner - Forbes Global Properties

## Architecture Decisions
- Stack: React frontend + FastAPI backend + MongoDB
- Frontend uses process.env.REACT_APP_BACKEND_URL for API calls (no hardcoded API URL)
- Backend persists leads in Mongo collection with explicit _id exclusion in responses to avoid ObjectId serialization issues
- Design system updated to PDF-derived red/white luxury palette (dominant reds around #f00000 / #ee3331)
- PDF visual pipeline added: rendered brochure/floor-plan pages stored in /app/frontend/public/pdf-assets and consumed in UI

## What Has Been Implemented
- Upgraded to brochure-rich red/white luxury single-page experience with expanded content depth and stronger narrative blocks
- Content summarized from customer deck and floor plan PDFs (AQI-managed positioning, tower/spec details, amenities, connectivity, unit data)
- Price emphasis implemented: Starts at ₹2.97 CR
- Project logo from PDF integrated in header (FAB LUXE RESIDENCIES)
- PDF images integrated across hero, brochure story sections, wellness/amenity visuals, and location context
- Dedicated Floor Plan Gallery added (master plan, site plan, typical plate, 3BHK and 4BHK plan sheets)
- Configuration Tabs added for buyer comparison (3 BHK + Study + 4T and 4 BHK + Study + 5T)
- Multi-entry popup lead CTA integrated (header, hero, final section, sticky desktop/mobile CTA)
- Popup form collects required 4 fields and shows success state on submit
- Toast notifications via sonner for validation/success/error
- Backend lead APIs implemented: create, list, get by id, update, delete (/api/leads)
- Sticky CTA behavior refined on desktop and mobile (including mobile overlap mitigation)
- Added data-testid attributes across interactive and critical elements for robust UI testing
- Added top navigation text links that scroll to: Price List, Location Map, Floor Plan, and Amenities sections
- Added new Price List table section with columns Type, Size, Price and "PRICE ON REQUEST" values
- Added Location Map section anchor plus external Google Maps open action
- Replaced top-right inquiry action with blinking CALL NOW button linked to +91 9810105007
- Added bottom-right blinking call action and WhatsApp floating button linked to wa.me/919810105007
- Added final footer text: "ATFL | Authorised Channel Partner - Forbes Global Properties"
- Switched hero background to user-uploaded image asset

## Validation Completed
- Self-tested backend APIs via curl: create/get/list success
- UI tested via screenshot automation: red/white theme, logo visibility, floor gallery/tabs, and popup open+submit paths on desktop/mobile
- Lint status: Python and JavaScript checks passed
- Testing agent iteration_2 reviewed: all major features passed; mobile sticky overlap issue fixed and self-retested
- Self-tested latest upgrade with screenshot automation for top nav anchors, hero image replacement, price table, map action presence, and floating call/WhatsApp controls

## Prioritized Backlog
### P0
- Add server-side input validation rules (phone format, budget normalization, anti-spam checks)
- Build basic internal leads dashboard page with filtering/export

### P1
- Add downloadable brochure/floor-plan PDF quick actions and zoom modal for plan sheets
- Add scroll-triggered section animations with reduced-motion accessibility fallback

### P2
- Add A/B variants for hero copy and CTA labels
- Add analytics events for CTA click heatmap and form completion funnel

## Next Tasks
1. Implement lead quality validation + anti-spam controls
2. Add admin-facing lead management UI
3. Add conversion analytics events for CTAs and form stages
