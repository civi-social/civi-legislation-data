# Getting Started

The civi-legislation-data repository contains the code for the backend data for our project.




# Getting Started
1. Navigate to the directory you'd like the project to be stored on your computer
2. For this example we'll in the documents section of your macbook
3. Open your code editor and enter cd ~/Documents
4. ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/4824411a-1d62-4b72-86c4-b5015685ab78)

#clone the repo
git clone -b update-readme-with-codebase-access https://github.com/civi-social/civi-legislation-data.git  

If the command was successful you should see the project appear in your code editor and the folder your placed it in documents folders. 

#navigate to project directory
cd civi-legislation-data  

lanuch your code with vscode
code .

#create a new branch
git checkout -b new_branch_test

confirm you're in the new branch
git branch
![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/78e759f8-0bbe-4eb5-980e-76ded2b008a9)


1. Next run `npm install` -  this reads the package.json file and install the dependencies and devdependencies specified in the file
2. Login to Legiscan (to sign up for an api key) to get your api key
<img width="730" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/5e497bfb-8b2b-43d5-a975-838f04a792a5">

<img width="1422" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/a713a75e-7dd4-4f39-af08-2bfac9f63ef2">

3. Navigate to the sidebar to create an API key.
<img width="1434" alt="SCR-20240407-mcrz" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/6252abd4-9964-44bc-8a6b-7c77ea2e3574">

4. Once your key is created navigate back to your code editor and run `LEGISCAN_API_KEY={YOUR_API_KEY} npm run scrape` in the terminal.
   - This passes an API key into the codebase that......is used to validate that the code should have access

5. OPENAI API Key
   - Navigate to https://platform.openai.com/docs/overview - create an account to generate an API key.
   - <img width="1423" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/b3ff2c40-26a3-456e-9281-93fb259cc547">
   - create a new secret key
   - <img width="1431" alt="SCR-20240407-mjwa" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/d0afd95a-599c-4da3-9674-df139046f2dd">

6. Once your key is created navigate back to your code editor and run `OPEN_API_KEY={YOUR_API_KEY} npm run gpt` (requires npm run scrape to run first)
  - THIS STEP IS EXTREMELY IMPORTANT. TO Ensure your code only runs once you must run the command exactly
  - This passes an API key into the codebase that......


9. OPEN_API_KEY=your-api-key LOCALE=usa BILL="HB5" npm run gpt-one -- this should ensure the command only runs once.
`LOCALE=usa BILL="HB5" npm run gpt-one`
<img width="1440" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/5fe442e9-528c-4f6b-aba9-bc2366d2fba6">


7. Google Sheets API  Key
   - Navigate to https://console.cloud.google.com/projectcreate?previousPage=%2Fwelcome%2Fnew%3ForganizationId%3D0&organizationId=0 and create a new project
   - go to the api section
   - <img width="1433" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/f9616b76-29fc-43bc-a59c-44bcd3e7c177">
   - navigate to enable apis and services
   - <img width="1435" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/9426c940-84d5-4204-a682-a099074c54df">
- Navigate to the Google sheets api and click enable
- <img width="914" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/61845c04-c58e-4328-98de-8d8bea9d8f0e">
- Click create credentials and generate new key
- <img width="1430" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/176f6535-75c6-4df4-afbc-9ccdfa3d3559">
<img width="1420" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/ad824619-23f2-4930-a956-1c7b135030a8">

Your Google API key generate and can be left as unrestricted
<img width="709" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/0b636768-0832-4b1f-bb52-a58b0a5c66e1">

Navigate back to your terminal and run `GOOGLE_SPREADSHEET_API_KEY={YOUR_API_KEY} npm run wiki`

If successful, you should see Check `dist_legislation` for files in your terminal
    - the actual sheet https://sheets.googleapis.com/v4/spreadsheets/1dEHnMY7KZ2kyQL5lraMNMerTdp3TP37JlF63eJMSXZQ/values/${range}?key=${apiKey}





Congrats you're now ready to contribute!


