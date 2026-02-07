# BE SEEN.PH — The Complete Vision
> Stephen's brain dump, Feb 8 2026

---

## The Core Concept

**BE SEEN is a community-powered local discovery platform.**

Not Google Maps with cars driving around. 150 million Filipinos mapping their own country.

---

## Three User Types

### 1. Scouts (Consumers)
- Browse places, businesses, hidden gems
- **ADD anything** — not just businesses:
  - Restaurants, bars, cafes
  - Parks, landmarks, statues
  - Hidden gems, viewpoints
  - Services, shops
- **"First to BE SEEN"** — badge for discovering places first
- Earn points for mapping
- Personalized feed based on interests
- Get notified about new places nearby

### 2. Tycoons (Business Owners)
- See places → **Claim** their business
- Verify ownership (GPS + selfie)
- Write their OWN promotional content
- Get notified when someone adds their business
- Manage their listing, respond to reviews
- Pay for premium features (AI content, analytics, boosting)

### 3. Admin (Stephen)
- Review and approve claims
- Manage content engine
- Monitor platform health
- Control verification standards

---

## The Viral Loop

```
Scout discovers place → Adds it → Gets points
                                      ↓
                          Business owner sees it
                                      ↓
                          Claims & verifies → Pays for premium
                                      ↓
                          Good listing → More scouts visit
                                      ↓
                          Scouts add more places nearby
```

**Key insight:** We don't need Google's car fleet. We have 150M people with phones.

---

## Content Engine — Living & Breathing Pages

### Dynamic Location Pages
Every location is alive:
- `/angeles-city` — All content tagged Angeles City
- `/pampanga` — All content tagged Pampanga
- `/makati` — All content tagged Makati

### Dynamic Category Pages
Every category is alive:
- `/restaurants` — All restaurants
- `/bars` — All bars
- `/parks` — All parks

### Combined Filters
- `/angeles-city/restaurants` — Restaurants in Angeles City
- `/makati/bars` — Bars in Makati

### Auto-Generated Content
AI writes articles about **PLACES** not businesses:
- "Best Pizza in Angeles City"
- "Top 10 Hidden Gems in Pampanga"
- "Weekend Getaways Near Manila"

**Businesses appear dynamically** in these articles based on:
- Location tags
- Category tags
- Ratings
- Activity

Businesses don't write the "best of" articles — WE do.
Businesses write about THEMSELVES (their own promo content).

---

## Gamification System

### Points
| Action | Points |
|--------|--------|
| Add a place | +50 |
| First to discover (bonus) | +100 |
| Upload photo | +25 |
| Write review | +30 |
| Verified visit | +20 |

### Scout Levels
- Newbie (0-99)
- Explorer (100-499)
- Mapper (500-1999)
- Legend (2000+)

### Badges
- "First to BE SEEN" — discovered a new place
- "Photographer" — 10+ photos uploaded
- "Reviewer" — 20+ reviews written
- "City Mapper" — added 50+ places in one city

### Rewards (TBD)
- Discounts from partner businesses?
- Free premium features?
- Recognition on leaderboards?
- Physical rewards?

---

## No Duplicates Rule

- GPS verification prevents duplicate places
- If place exists, user gets "already added" message
- User can suggest edits to existing places
- Admin reviews disputed claims

---

## Consumer → Business Owner Flow

If a Scout has a business:
- Their mapping points can transfer
- They get bonus for being an active community member
- Fast-track verification

---

## Revenue Model

### Free (Scouts)
- Browse, search, discover
- Add places, earn points
- Basic profile

### Free (Business - Unclaimed)
- Listed on platform
- Basic info visible

### Claimed (Business - Free Tier)
- Verify ownership
- Edit listing
- Respond to reviews

### Premium (Business - Paid)
- AI-generated posts
- Analytics dashboard
- Boosted visibility
- Priority support
- Multiple locations

---

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Supabase (Postgres + Auth + Realtime)
- **AI:** Claude for content, GPT for ideas
- **Maps:** Mapbox or Google Maps API
- **Hosting:** Vercel
- **Monorepo:** Turborepo

---

## The Motto

> "150 million Filipinos mapping their country. Not Google cars. People."

---

*This is the vision. Everything we build serves this.*
