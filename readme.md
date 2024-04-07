# Getting Started

The civi-legislation-data repository contains the code for the backend data for our project.


# Getting Started
1. Navigate to the directory you'd like the project to be stored on your computer
2. For this example we'll in the documents section of your macbook
3. Open your code editor and enter cd ~/Documents
4. ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/4824411a-1d62-4b72-86c4-b5015685ab78)

5. Alternatively you can navigate to Finder and create a new folder
6. ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/465efbda-c2fc-421d-a330-da1f5264bc5d)

7. Once your terminal reads run `git clone https://github.com/civi-social/civi-legislation-data.git`  ---- this will create a clone of the repository.




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

make sure you create a new project
make sure you create a Google Sheets API (ensure this is true)


7.  Check `dist_legislation` for files
    - what does this mean?

8. ? # To Run 1 GPT Summary (for dev)

9. OPEN_API_KEY=your-api-key LOCALE=usa BILL="HB5" npm run gpt-one -- this should ensure the command only runs once.
`LOCALE=usa BILL="HB5" npm run gpt-one`
<img width="1440" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/5fe442e9-528c-4f6b-aba9-bc2366d2fba6">




11. ---------

1. How do you ensure everything loaded properly?
2. What do you do after everything loaded properly?
3. what does this mean? -- civi-legislation-data
