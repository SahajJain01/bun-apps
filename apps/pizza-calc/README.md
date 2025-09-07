<div align="center">

# Pizza Dough Calculator

![Bun](https://img.shields.io/badge/Bun-1.x-000000?logo=bun&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=000)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5-7952B3?logo=bootstrap&logoColor=white)
![Status](https://img.shields.io/badge/App-Static%20Site-2ea44f)

Calculate precise dough formulas in real-time. Tune diameter, thickness factor, hydration, and baker’s percentages. See grams, ounces, cups, and teaspoon/tablespoon conversions side-by-side.

</div>

---

## Features

- Auto-calculate on input with debounce; no submit required
- Metric/Imperial toggle with on-the-fly unit conversion
- Thickness factor area formula (replaces polynomial guesswork)
- Results in grams, ounces, and approximate cups
- tsp/tbsp conversions using clean 1/8-step unicode fractions (⅛, ¼, ⅜, ½, ⅝, ¾, ⅞)
- Inputs persisted via localStorage
- No jQuery or Bootstrap JS — minimal, fast static page

## Quick Start

- Option A: Open `index.html` directly in your browser
- Option B: Serve locally

```bash
# from apps/pizza-calc
bunx serve . -l 5173
# open http://localhost:5173

# or run the static server (Bun/Node)
bun server.js
# open http://localhost:3000
```

## Usage Tips

- Typical thickness factor range: 0.35–0.50 g/cm² (≈0.09–0.12 oz/in²)
- Flour cups are approximated at ~120 g/cup; adjust to your brand if needed
- Hydration defaults to 60%; tweak for style (Neapolitan, NY, pan, etc.)

## Tests

Minimal browser tests for fractions and rounding:

```bash
# from apps/pizza-calc
bunx serve tests -l 5174
# open http://localhost:5174
```

## File Structure

```text
apps/pizza-calc/
- index.html      # UI (header, hero, form left, results right)
- style.css       # theme and layout
- utils.js        # unit math, TF, fractions, debounce
- index.js        # wiring: auto-calc, unit toggles, persistence
- server.js       # minimal static server (optional)
- bun-app.json    # app metadata (prod command, domain)
- tests/index.html# tiny test harness
```

## Credits

by @SahajJain01 and @sachinnitish

