# Jan–Aug Pharmacies Analysis Dashboard

Interactive pharmacy sales dashboard comparing Jan–Aug 2025 vs Jan–Aug 2026.

## Included
- Linked multi-select filters: Sales Rep. Name, Zone, State, Name/Pharmacy, Sales Return Value band
- 2025 vs 2026 sales comparison for the same Jan–Aug period
- Top 10 customers with growth >= 10% by state
- Top 10 customers with decline <= -10% by state
- Pharmacy-level analysis
- Zone-level analysis
- State-level analysis
- Customers with 2026 sales >= 10,000
- Returns value and return-rate KPI
- Interactive Plotly charts
- Dark neon + glassmorphism UI
- Excel / CSV browser upload; data is processed locally in the browser

## Data columns
The app auto-detects common column names and also shows a mapping panel. Recommended columns:
- Date or Year + Month
- Sales Value
- Sales Return Value
- Sales Rep. Name
- Zone
- State
- Name / Pharmacy

Only Jan–Aug rows from 2025 and 2026 are used in the comparison.

## Run locally
Open `index.html` in a modern browser and upload your `.xlsx`, `.xls`, or `.csv` file.

## GitHub Pages
Because the app is static, it is GitHub Pages-ready. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## Privacy
Uploaded sales files stay in the user's browser and are not uploaded by this dashboard.