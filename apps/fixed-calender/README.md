<div align="center">

# Fixed Calendar (IFC)

![AngularJS](https://img.shields.io/badge/AngularJS-1.6-c3002f?logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5-7952B3?logo=bootstrap&logoColor=white)
![Status](https://img.shields.io/badge/App-Static%20Site-2ea44f)

Interactive visual of the 13×28 International Fixed Calendar with New Year Day(s).

</div>

---

## Features

- Scrolls to the current day-of-year on load
- Year navigation with graceful month/day handling
- Highlights today in the current year

## Run Locally

Option 1 — Bun (recommended):

```bash
bun run start
# then open http://localhost:3000
```

Option 2 — Node built-in static server (no deps):

```bash
npm run start:node
# then open http://localhost:3000
```

Option 3 — Python (if installed):

```bash
python -m http.server 3000
# then open http://localhost:3000
```

Option 4 — http-server via npx (requires Node):

```bash
npx http-server -p 3000 -c-1
```

## Notes

- Static, client-only demo; AngularJS core only (no routing/animation)
- Day IDs 1–364 map to IFC month grid; 365/366 are New Year Day(s)
- Leap year logic uses the standard Gregorian rule

## Project Structure

- `index.html` — markup and layout
- `app.js` — AngularJS controller and logic
- `assets/` — styles and libraries
- `server.js` — minimal static web server

