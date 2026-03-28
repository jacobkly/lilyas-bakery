# 🧁 Bakery Website — Agent Instructions

## 1. Project Overview

This is a premium, modern bakery website for a single owner.

The site serves as:

* a digital storefront
* a portfolio for baked goods
* a brand presence

This is a **UI-first project** where visual quality is the highest priority.

---

## 2. Core Goals

### Primary

* Create a visually stunning, modern UI
* Establish a premium bakery brand
* Showcase items in an image-first layout
* Keep system simple and maintainable

### Secondary

* Allow admin to manage content easily
* Ensure fast performance
* Maintain clean UX

---

## 3. Non-Goals

* No payments or e-commerce
* No customer accounts
* No complex backend systems
* No multi-user roles

---

## 4. Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Custom UI components (NO default Tailwind look)

### Admin UI

* shadcn/ui (allowed ONLY in admin panel)

### Backend

* Supabase (database, auth, storage)

---

## 5. Data Model

Table: bakery_items

* id (uuid)
* name (text)
* description (text)
* main_image_url (text)
* additional_image_urls (text[])
* ingredients (text[])
* allergens (text[])
* created_at (timestamp)
* updated_at (timestamp)

---

## 6. Core Features

### Public Website

#### Homepage

* Hero section
* Featured items
* About section
* Contact/footer

#### Menu Page

* Grid of bakery items
* Image-first cards

#### Item Detail Page

* Large image + gallery
* Description
* Ingredients list
* Allergens list

---

### Admin Panel

* Supabase authentication (single admin)
* Dashboard (list items)
* Create / edit / delete items
* Image upload (Supabase storage)

---

## 7. Design System (CRITICAL — MUST FOLLOW)

### Brand Direction

Modern artisan bakery

Keywords:

* warm
* soft
* minimal
* inviting
* premium but approachable

---

### Colors

* Background: #FFF8F2
* Section: #F3E8DC
* Primary: #C08A5D
* Secondary: #6B4F3A
* Text: #2B2B2B
* Muted: #6B6B6B
* Accent: #E8B4A0

Rules:

* No pure white backgrounds
* No pure black text
* Use spacing instead of excessive colors

---

### Typography

* Headings: serif (Playfair Display style)
* Body: sans-serif (Inter style)

Scale:

* H1: 48–64px
* H2: 32–40px
* H3: 24px
* Body: 16–18px

---

### Layout System

* Max width: 1200px
* Section spacing: py-16 to py-24
* Rounded corners: xl
* Soft shadows only

---

### Components

Cards:

* Image-first
* Rounded-xl
* Subtle shadow
* Soft hover states

Buttons:

* Rounded-full
* Primary color background
* Subtle hover effect

---

## 8. UI / UX Rules (STRICT)

* Image-first design always
* Prioritize spacing and hierarchy
* Clean, minimal layouts
* Mobile-first responsive
* Smooth transitions (no aggressive animations)

---

## 9. Anti-Patterns (DO NOT DO)

* Default Tailwind UI appearance
* Dashboard-style UI on public pages
* Dense or cluttered layouts
* Too many colors
* Harsh contrasts

---

## 10. Admin Panel Rules

* Use shadcn/ui ONLY in admin
* Keep UI simple and functional
* Prioritize usability over aesthetics
* No over-designed interfaces

---

## 11. Backend Rules

* Use Supabase only
* Keep schema simple
* No complex RLS
* No unnecessary abstractions

---

## 12. Development Workflow

1. Build UI with mock data first
2. Ensure UI quality and consistency
3. Then connect Supabase
4. Then build admin panel

---

## 13. Development Philosophy

* UI quality > feature complexity
* Simplicity > over-engineering
* Consistency > creativity
* Ship fast, iterate later

---

## 14. Final Principle

Simple, warm, and visually premium always wins over complex.
