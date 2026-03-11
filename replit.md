# Cadastro Facilitado - Quanta Shop

A static landing page for Quanta Shop's first-purchase cashback registration system.

## Overview

This is a Vue 3 (CDN) + jQuery + Bootstrap 4 static HTML site. It presents a registration form for Quanta Shop customers to sign up for cashback on their first purchase.

## Tech Stack

- **Frontend**: Vue 3 (CDN via unpkg)
- **UI Framework**: Bootstrap 4
- **JavaScript**: jQuery, Slick carousel, Toastify
- **Fonts**: Font Awesome, Ionicons
- **Server**: `serve` (static file server)

## Project Structure

```
/
├── index.html          # Main HTML (Vue template + page markup)
├── assets/
│   ├── css/            # Bootstrap, component styles, custom CSS
│   ├── fonts/          # FontAwesome, Ionicons, Slick fonts
│   ├── images/         # Page images
│   ├── js/             # jQuery, Bootstrap, Vue utilities, main.js
│   └── scss/           # Source SCSS files
└── package.json        # npm scripts (serve)
```

## Features

- Registration form with CPF, WhatsApp, email, password, purchase value, and receipt upload
- Vue 3 form validation and submission
- Toastify notifications
- Page loader animation (jQuery controlled)
- Responsive Bootstrap layout
- Social links in footer (WhatsApp, Instagram, Facebook, YouTube)

## Running

```bash
npx serve . -p 5000    # Serve static files on port 5000
```

## Deployment

Configured as a **static** deployment.
- No build step needed
- Public directory: project root (`.`)
