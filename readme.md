# Getting Started

The civi-legislation-data repository contains the code for the backend data for our project.


# Getting Started


## Navigate to Folder
1. Open your code editor
2. Navigate to the directory you'd like the project to be stored on your computer. For this example, we'll store the project in the documents folder 
3. `cd Documents`

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/498b3d10-590a-4c3e-99e9-da5de86c7130)


## 2. Clone the repository
In your desired folder enter
`git clone -b update-readme-with-codebase-access https://github.com/civi-social/civi-legislation-data.git`into your folder


<img width="760" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/e64461df-e4d1-4381-b475-2f6534d5bb7a">

.....

If the command was successful, the project should now appear in the folder you specified

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/deab62dc-4b51-402e-ba8d-98c9216e47e0)

To launch the project directly either 

1. Launch the project from the terminal using
 
3. Inside the new project navigate to the root directory
`cd civi-legislation-data``code .`

 ![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/8d94962c-1f02-4dc4-885b-b25bb00d4138)

2. Drag and drop the folder into your code editor. 

## 3. Load dependencies

1. Inside the root directory, create a new branch
`git checkout -b new_branch_test`

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/0f67f687-b06d-47b0-bea7-9d15319e0c48)

2. confirm you're in the new branch by running `git branch`

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/fa04e36a-115d-4633-956c-e9150419dc3f)


3. Next, in the terminal run `npm install` -  if this was successful the node-modules folder should now appear in your folder.

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/cfa6c46e-9c70-4920-a744-a8cf90f64596)


### Get Legiscan API Key
Sign up for an account at Legiscan.com [Legiscan](https://legiscan.com/) to obtain an API key

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/c0154a46-8781-4753-b581-0ae0afe93af7)




### After you obtain your API Key run 

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/1390ece1-592b-4a65-b31a-6ac41e505334)

In the terminal run `LEGISCAN_API_KEY={YOUR_API_KEY} npm run scrape` 

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/08b51061-3e7f-4568-8565-088b1b912341)


This passes an API key into the codebase that......is used to validate that the code should have access




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








You can create an API key from the **My account** or **LegiscanAPI** key links in the sidebar
<img width="1434" alt="SCR-20240407-mcrz" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/6252abd4-9964-44bc-8a6b-7c77ea2e3574">


How do you know this step finished properly? - I got this error Message....
![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/5ca0bf31-fae0-474a-b979-b2b32b47faad)

