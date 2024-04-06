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


# start-here

1. Added to GitHub organization to be able to push to each repo
2. For backend work, go to `civi-legislation-data`
3. For frontend work, go to `windy-civi-web`

civi-legislation-data 

# Getting Started
1. `npm install` - (what does this install?)
2. `LEGISCAN_API_KEY=insert npm run scrape`
3.   - go to legiscan and download api key
     - run LEGISCAN_API_KEY=insert npm run scrape in the terminal
  -   where is this located?
  -   what does it do?


3. `OPEN_API_KEY=insert npm run gpt` (requires npm run scrape to run first)
  - This should actually say OPENAI_API_KEY
  - where is this located
  - what does this do

- what does this message mean??
----------summarizing legislation ocd-bill/b7b76696-f4de-4480-87ed-575615c748c1 Amendment of Municipal Code Section 4-60-023 (48.4) to allow additional package goods licenses on portion(s) of W Berwyn Ave and W Foster Ave
Need to provide OPEN_API_KEY as environment var


should the google api key be restricted or unrestricted?

5. GOOGLE_SPREADSHEET_API_KEY=value npm run wiki

6. the actual sheet https://sheets.googleapis.com/v4/spreadsheets/1dEHnMY7KZ2kyQL5lraMNMerTdp3TP37JlF63eJMSXZQ/values/${range}?key=${apiKey}



7.  Check `dist_legislation` for files
    - what does this mean?

8. ? # To Run 1 GPT Summary (for dev)

9. OPEN_API_KEY=your-api-key LOCALE=usa BILL="HB5" npm run gpt-one -- this should ensure the command only runs once.




11. ---------
`LOCALE=usa BILL="HB5" npm run gpt-one`


civi-legislation-data
