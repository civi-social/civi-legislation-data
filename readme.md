# Getting Started

This document provides an overview of how to get started with the backend repository.

In the terminal - navigate to the folder where you'd like this project stored. For the purposes of demonstration, we'll store this project in the **documents** folder by running `cd documents`. 

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/bc3d0e9f-0317-41b6-8c93-0ee0fd482cc7)

In the terminal enter
`git clone -b update-readme-with-codebase-access https://github.com/civi-social/civi-legislation-data.git`to clone the repo.

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/cffd1fe7-625c-414d-8545-3a8094595dde)

You should now see the project listed in the folder you specified

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/01fc8345-85fc-4074-a058-a4cde6aed908)



Navigate into the project folder by running `cd civi-legislation-data`

<img width="934" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/f6a0c749-204e-4b54-b12f-0d3fcc90fd3d">


If you're using VSCode run `code .` to open the project

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/40455420-2823-42c5-95db-9e9b21e39d15)

Alternatively, you can drag and drop the project into your code editor 

<img width="954" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/dce76b3d-9a2c-4f86-ac46-13f3070bfbb3">

  &nbsp;
  &nbsp;
  
Inside the project, create a new branch by running `git checkout -b YOUR_BRANCH_NAME` - **make sure to change the branch name**.

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/33e62b00-debd-4405-aba2-3c9a91833d2a)

Confirm you're in the new branch by running `git branch`

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/fa04e36a-115d-4633-956c-e9150419dc3f)

Next, run `npm install`. This installs the dependencies for the project. You'll know this command was successful if the node-modules folder is now visible

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/cfa6c46e-9c70-4920-a744-a8cf90f64596)


## Sign up for LegiScan API Key
Sign up for a [Legiscan account](https://legiscan.com/) to obtain an API key

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/e0e801c3-cef2-4df9-b6ff-a7a4327d7c3f)


After obtaining your key, run `LEGISCAN_API_KEY={YOUR_API_KEY} npm run scrape`. This fetches all the current bills from LegiScan.

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/08b51061-3e7f-4568-8565-088b1b912341)

## Sign up for OpenAI API Key
Before proceeding, ensure you've completed the LegiScan installation, or this step will fail.  

Sign up for an [OpenAI account](https://platform.openai.com/docs/overview ) and create a new secret key.

<img width="947" alt="image" src="https://github.com/civi-social/civi-legislation-data/assets/91917755/0f5bf8e5-1778-4ba8-93e3-cc813d274c4b">


THE NEXT STEP IS CRITICALLY IMPORTANT!

After you've obtained your secret key, run the EXACT command below (ensuring to replace `your-api-key`) `OPEN_API_KEY=your-api-key LOCALE=usa BILL="HB5" npm run gpt-one` This is critically important to ensure that OPENAI only translates one of the bills instead of the entire list of bills which is expensive. 

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/c7613854-3abb-437c-a544-dd8dbe9878b6)

If you see a ton of output in the terminal it likely means ChatGPT is translating everything - kill the process immediately!

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/318316f5-cf02-45ed-b542-b03a1f349d99)

## Register a Google Sheets API key
Create a new project in the [Google Cloud Console](https://console.cloud.google.com/projectcreate?previousPage=%2Fwelcome%2Fnew%3ForganizationId%3D0&organizationId=0) 

Once your project is active select "APIs and Services".  
![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/2284f764-ad94-47d9-99cb-62ce41be5b8b)

Enable APIs and services in the navbar

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/c0ac39e1-2635-4f09-92c0-763ac54bb411)


Navigate to the Google Sheets API and click enable 
   
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

![image](https://github.com/civi-social/civi-legislation-data/assets/91917755/1390ece1-592b-4a65-b31a-6ac41e505334)
