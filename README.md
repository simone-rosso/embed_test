# React Coding Assessment

## Overview
To complete this assessment, you will need to write a simple [React](https://facebook.github.io/react/) web app, and provide us the source files to be built.

The purpose of this assessment is to assess your **skills and approach to composing a simple web app** given an API feed.  We will also assess the **generated HTML, CSS, and JS** output.

This assessment is expected to take about 2-3 hours.

## How should the application work?

The user of this react application should be able to view the video response(s) of job candidates applying for a job at their company. The application should have the following workflow,

1. Choose candidate from a list.
2. Depending on the selection in the first step, if the selected candidate has an application, display the video response(s) of the candidate with the relevant question displayed in text. If the selected candidate does not have an application, display appropriate message.
3. For each video response of a candidate, provide an option to enter comments.
4. Provide a "Save" button that saves the comments to the api.json file.

## Requirements

* Only step 1 should be visible when no candidate is picked. Step 1,2,3 and 4 should be visible when a candidate is picked.

* User should be able to change candidate selection at any time.

* You can use whatever libraries, task runners and build processes you like. React and plain JavaScript are the only requirements (ES6 encouraged, but no TypeScript, CoffeeScript, etc). Redux is strongly encouraged if you see a need for it.

## API Usage

You will need to run npm install once you starting working on the project to install dependencies.

| Endpoint                     | Result                                              |
|------------------------------|-----------------------------------------------------|
| /candidates                  | Lists all available candidates                      |
| /questions                   | Lists all available questions                       |
| /applications                | Lists all available applications                    |

* To lunch API, use the script `npm run start:api` 
* To lunch Ui, use the script `npm run dev`

---

## Scaffolding
- backend
- src -> frontend
- test
- public -> assets 

## Libraries

- vite for packaging
- react for UI
- material ui for components
- react router for SPA routing
- redux for state management
- prettier for 

## Setup

Originally I thought to develop an application with two screens, in the first one, the applications page, there would be a list of cards with all candidates with a small info panel with all details like: name, title, position where applied, brief description, total videos that the hiring manager has seen and overall evaluation.
Clicking on the card, there would be an animation that put all the candidates in a navbar and the page switch to the candidates page (src/cadidates).
For this application I thought to implement react router to switch between pages, and redux to caching data in the store, to not make api calls if switching through pages.
For time reason I just developed the candidates page and left the setup to develop the improvements.
The page of candidates would have an url like 'path/candidates' that can switch to a 
'path/candidates/applicationId=12345' in case the application '12345' is selected. This is usefull to share links about a specific video. For time reason I decided to let the candidates page in the root path.

## Improvements

I would like to spend more time on the development but I didn't had so much time, so basically I just did a working version of what I wanted to do.

From the functional side, I would like to make urls that can split between two views, one for the list of the candidates and another (the one that i developed) that show the list of candidates, the questions and the videos. I have impemented redux and react router to achieve this.
Another improvement would be the error and loading handling, for example using more specific error messages and skeleton when the page is loading videos and lists.

From the graphic point of view, I would like to make some improvements because it's an MVP but a little ugly. I would start changing the navbars for something with less impact for the view of the user and in general improve styles. Another think that I had though was to make an animation for switching between the page with all candidates and the second with the candidates list.

I would like to have more time to develop the application with, at least, unit tests with vitest and e2e tests with cypress, although for this time I did Q/A manually.

For the performance, I was thinking on create two different configurations for the builds and different environment, one for the development mode and one optimized for production, but, for the same reason that I didn't deployed the application, it was sort of useless. The same think I left aside for a serverless database with Firebase. It would be interesting populating the database to measure the performances.

From the product development himself, I think that there would be a lot of thing that could be improved, a few ideas are already in the previous section (Setup), and more like:

- login
- multi comments from different users
- evaluation of the video based on points from 1-10
- CRUD for comments and evaluations
- already visited showed by a check on the candidate and questions
- share video
- dark mode
- i18n