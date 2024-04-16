# Getting Started

This document provides a brief overview of how to get started with WindyCivi's backend repo.

1. In the terminal - navigate to the folder where you'd like this project stored. For the purposes of demonstration, we'll store this project in the **documents** folder by running cd documents. 

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/498b3d10-590a-4c3e-99e9-da5de86c7130)


## 2. Clone the repository
In the documents folder enter
`git clone -b update-readme-with-codebase-access https://github.com/civi-social/civi-legislation-data.git`into your folder


<img width="760" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/e64461df-e4d1-4381-b475-2f6534d5bb7a">

The project should now appear in the folder you specified

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

Run `LEGISCAN_API_KEY={YOUR_API_KEY} npm run scrape` in the terminal (This passes an API key into the codebase that......is used to validate that the code should have access).

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/08b51061-3e7f-4568-8565-088b1b912341)


Navigate to [OpenAI's website](https://platform.openai.com/docs/overview ) to obtain an API key.
<img width="947" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/0f5bf8e5-1778-4ba8-93e3-cc813d274c4b">

### After you obtain your API Key 
Open the terminal and run
OPEN_API_KEY=your-api-key LOCALE=usa BILL="HB5" npm run gpt-one 


Run `OPEN_API_KEY={YOUR_API_KEY} npm run gpt` Please ensure you're performed the Legiscan step first or this step will not work. 
requires npm run scrape to run first)
  - THIS STEP IS EXTREMELY IMPORTANT. TO Ensure your code only runs once you must run the command exactly
  - This passes an API key into the codebase that......



## Google Sheets API  Key
Navigate to the [Google Cloud Console](https://console.cloud.google.com/projectcreate?previousPage=%2Fwelcome%2Fnew%3ForganizationId%3D0&organizationId=0) and create a new project

1. Create a new projects
2. Once your project is active select "APIs and Services".
<img width="1433" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/f9616b76-29fc-43bc-a59c-44bcd3e7c177">
   
## Enable APIs and services
1. Click on enable APIs and services in the navbar

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/ff50ce39-7407-411a-9a7b-db08abb7cfd8)

## Enable Google Sheets API
1. Navigate to the Google Sheets API and click enable 
   
<img width="914" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/61845c04-c58e-4328-98de-8d8bea9d8f0e">

## Create credentials and generate a new API key 
1. Click **credentials** in the sidebar
2. Select **create credentials** in the navbar
3. Select API Key from the dropdown menu

<img width="1420" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/ad824619-23f2-4930-a956-1c7b135030a8">


Once you've obtained your API Navigate back to your terminal and run `GOOGLE_SPREADSHEET_API_KEY={YOUR_API_KEY} npm run wiki`

It's okay if the key is left as unrestricted
<img width="709" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/0b636768-0832-4b1f-bb52-a58b0a5c66e1">

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/3a5c1976-5cfb-4c2b-8950-5d0bb76f3684)


If successful, you should see the `dist_legislation` folder in your files for files in your terminal

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/f14dafe3-0252-49dd-a85d-eb61c334a1e8)


The Google sheet where manual adjustments are being tracked is [here](https://sheets.googleapis.com/v4/spreadsheets/1dEHnMY7KZ2kyQL5lraMNMerTdp3TP37JlF63eJMSXZQ/values/${range}?key=${apiKey}). 

To access it, make sure you add your API Key to the end of the URL.

https://sheets.googleapis.com/v4/spreadsheets/1dEHnMY7KZ2kyQL5lraMNMerTdp3TP37JlF63eJMSXZQ/values/${range}?key=${apiKey}

![Uploading image.png…]()


Congrats you're now ready to contribute!





You can create an API key from the **My account** or **LegiscanAPI** key links in the sidebar
<img width="1434" alt="SCR-20240407-mcrz" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/6252abd4-9964-44bc-8a6b-7c77ea2e3574">


How do you know this step finished properly? - I got this error Message....
![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/5ca0bf31-fae0-474a-b979-b2b32b47faad)


- <img width="1430" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/176f6535-75c6-4df4-afbc-9ccdfa3d3559">
