# Getting Started

The civi-legislation-data repository contains the code for the backend data for our project.




# Getting Started
1. Navigate to the directory you'd like the project to be stored on your computer
2. For this example we'll in the documents section of your macbook
3. Open your code editor and enter cd ~/Documents
4. ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/4824411a-1d62-4b72-86c4-b5015685ab78)

#clone the repo
git clone -b update-readme-with-codebase-access https://github.com/civi-social/civi-legislation-data.git  

#navigate to project directory
cd civi-legislation-data  

lanuch your code with vscode
code .

#create a new branch
git checkout -b new_branch_test

confirm you're in the new branch
git branch
![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/78e759f8-0bbe-4eb5-980e-76ded2b008a9)


Make sure to from VScode
civi-legis![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/54fd5b93-005b-42a3-9574-152b820498d7)


5. Alternatively you can navigate to Finder and create a new folder
6. ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/465efbda-c2fc-421d-a330-da1f5264bc5d)

7. Once your terminal reads run `git clone https://github.com/civi-social/civi-legislation-data.git`  ---- this will create a clone of the repository.


If the command was successful you should see the project appear in your code editor and your documents folders. 


Next run `npm install` - (what does this install?) - this installs the npm package manager to run scripts??

1.  `LEGISCAN_API_KEY=insert npm run scrape`

Login to Legiscan (and select the free option) to get your api key
<img width="730" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/5e497bfb-8b2b-43d5-a975-838f04a792a5">

<img width="1422" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/a713a75e-7dd4-4f39-af08-2bfac9f63ef2">

Navigate to the sidebar and select either my account or Legiscan API key to create an API key.
<img width="1434" alt="SCR-20240407-mcrz" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/6252abd4-9964-44bc-8a6b-7c77ea2e3574">

Once your key is created navigate back to your code editor and run

`LEGISCAN_API_KEY={YOUR_API_KEY} npm run scrape` in the terminal.
This passes an API key into the codebase that......
Without this you will not be able to run the project.
   where is this located?
  -   what does it do?

3. OPEN AI API Key
Navigate to https://platform.openai.com/docs/overview - and create an account to access an API key.
<img width="1423" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/b3ff2c40-26a3-456e-9281-93fb259cc547">


create a new secret key
<img width="1431" alt="SCR-20240407-mjwa" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/d0afd95a-599c-4da3-9674-df139046f2dd">


Once your key is created navigate back to your code editor and run

`OPEN_API_KEY={YOUR_API_KEY} npm run gpt` (requires npm run scrape to run first)
1. IMPORTANT - ENSURE CODE ONLY RUNS ONCE
2. This passes an API key into the codebase that......
3, Without this you will not be able to run the project.
  - This should actually say OPENAI_API_KEY

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
