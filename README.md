# 📊 Loan Data Dashboard – Take-Home Challenge

This project is my take on an interactive loan data dashboard that includes a table, chart, and filter controls — all powered by fast, reactive state and styled with a modern component library. My focus was building something **production-ready**, **performant**, and **pleasant to use**, with clean architecture and code readability.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Performance Highlights](#performance-highlights)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Concluding Remarks](#concluding-remarks)

---

## 🎯 Overview

The goal was to display loan data with:

- An **aggregated table** grouped by grade
- A **bar chart** that dynamically updates with filters
- **Dropdowns** to filter by home ownership, quarter, term, and year
- A **reset button** to clear all filters

---

## ✨ Features

- **Interactive Filters** – 4 dropdowns connected to global state
- **Aggregated Table** – Totals grouped by loan grade, dynamically generated columns
- **Bar Chart** – Live-updated chart using Recharts with compact currency formatting
- **Reset Filters** – Restores view to full dataset
- **Responsive UI** – Mobile-first layout using Tailwind CSS
- **Visual Polish** – Hover animations, compact labels, and component hierarchy with ShadCN Cards

---

## 💪 Performance Highlights

- **Compact Number Format** – Currency labels switch to `$1.2K`, `$1.4M` as needed
- **Hover Animations** – Bars scale with subtle drop shadows for tactile feedback
- **Zustand State Management** – Avoids prop drilling and rerenders

---

## 🚀 Tech Stack

| Tool             | Purpose                               |
| ---------------- | ------------------------------------- |
| **React + Vite** | SPA architecture and fast builds      |
| **Zustand**      | Global state management               |
| **Recharts**     | Charting and visualization            |
| **Tailwind CSS** | Utility-first responsive styling      |
| **ShadCN UI**    | Accessible, themeable components      |
| **TypeScript**   | Static typing for all logic and props |

---

## 🏁 Getting Started

```bash
# Clone the repo
git clone https://github.com/ggandara8/g-gandara-dv01-challenge.git
cd g-gandara-dv01-challenge.git
```
# Install dependencies
```bash
npm install
```
# Start the development server
```bash
npm run dev
```

## Folder Structure

src/
├── components/    # Filters, chart, table
├── store/         # Zustand global state
├── utils/         # Aggregation, filtering, formatting
├── request/       # API
└── App.tsx        # Main app layout

## 🧪 Testing

This project includes unit tests for the core reducer logic that powers filtering, aggregation, and value extraction for the table and chart views.

### ✅ What’s Covered

- `matchesFilters` — Verifies that a loan entry matches the selected filters
- `aggregateCurrentBalanceByGrade` — Aggregates balance totals by loan grade
- `getUniqueValuesForFilters` — Extracts unique and sorted dropdown values from the dataset

Tests are written using [**Vitest**](https://vitest.dev/)


### 📦 Run the Tests

```bash
npm run test
```

## Concluding Remarks

This challenge was a great opportunity to demonstrate how I think about UI architecture, state modeling, and data-driven components — all while staying focused on performance and maintainability. I approached this as if I were building a real production dashboard, and I’m proud of how clean, modular, and fast the final result is.

That said, every solid MVP opens the door to bigger possibilities. If I were to take this further, here’s what I’d explore next:

- **E2E Testing**: I’ve covered unit tests for all reducer logic, but expanding to full end-to-end tests with Playwright would help validate filters, UI interaction, and visual regressions across breakpoints.

- **UI Polish & Flexibility**: There’s an opportunity to introduce chart theming, export functionality (CSV/PNG), and persistent filters via query params or localStorage for a more user-centric experience.

- **Data at Scale**: This app was designed to be backend-ready. Replacing the mock `getData()` call with a real paginated API or GraphQL endpoint would be a natural next step — including loading states and caching.

- **Dashboard Extensibility**: The architecture could easily support additional metrics, multiple views, or a broader filtering system. The groundwork is here; scaling it into a full reporting tool is the next logical move.

In short, I treated this like a production problem — and if this were a live product, I’d be confident scaling it up while keeping the codebase clean and the performance sharp. 🚀


