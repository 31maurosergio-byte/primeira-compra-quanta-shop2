# Quanta Shop

A Brazilian e-commerce shopping application built with React and Vite.

## Overview

Quanta Shop ("primeira compra" = "first purchase") is a product showcase and shopping cart web app in Portuguese targeting Brazilian users. It features product listings, category filtering, search, and a cart with quantity management.

## Tech Stack

- **Frontend**: React 19 + Vite 7
- **Language**: JavaScript (JSX)
- **Styling**: Plain CSS (no external UI library)
- **Build tool**: Vite

## Project Structure

```
/
├── src/
│   ├── App.jsx       # Main application component (products, cart, UI)
│   ├── App.css       # All component styles
│   ├── main.jsx      # React entry point
│   └── index.css     # Global reset/base styles
├── index.html        # HTML entry (lang="pt-BR")
├── vite.config.js    # Vite config (port 5000, host 0.0.0.0, allowedHosts: true)
└── package.json
```

## Features

- 12 product listings with categories, prices, ratings, and badges
- Category filter bar (Todos, Eletrônicos, Calçados, Vestuário, etc.)
- Live search filter by name and category
- Add to cart with quantity management
- Cart modal with subtotal, shipping, and total calculation
- Free shipping threshold (R$ 299)
- Toast notifications on add to cart
- Fully responsive design
- Portuguese (pt-BR) interface

## Running

```bash
npm run dev   # Development server on port 5000
npm run build # Production build to dist/
```

## Deployment

Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist`
