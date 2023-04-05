# Normalized Legislation Data with GPT Summaries 

- Gets active Chicago, Illionis, and USA legislation data and normalizes it as CiviLegislationData.
- Summarizes legislation using OpenAI DaVinci GPT algorithm.

# How to run

- `npm install`
- `LEGISCAN_API_KEY=insert npm run scrape`
- `OPEN_API_KEY=insert npm run gpt` (requires npm run scrape to run first)
- Check `dist_legislation` for files

# To Run 1 GPT Summary (for dev)

`LOCALE=usa BILL="HB5" npm run gpt-one`