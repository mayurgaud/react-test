# React Assignment

## Introduction

This is a test project, is to showcase the level of competence and analytical way of thinking, as asked by client.

Requirements for this project are taken from the `React Assessment 07-2016.pdf` shared by client.

Developer `Mayur` has done this test.

## Technology Stack
1. React
2. Redux (http://redux.js.org/)
3. React-virtualized (https://bvaughn.github.io/react-virtualized/)

## Folder Structure

    To separate different components of the project, we have arranged them in different folders as follow:
1. actions
    - Fetch data from API
    - Responsible for sending data from application to store.
2. components
    - It creates view for rendering content on the screen.
      - Picker - Used for drop down filtering on basis on transaction type
      - Posts - Used for show the list of transaction fetch from the API
3. containers
    - Contains App.js , its main file having initialization, rendering functions, components and states.
4. reducers
    - its take care of the response changes
5. store
    - it hold state of the application and allow access to state.


## Task Completed
1. Build a small react app
2. Show a (filterable) list of IATI transactions.
3. Infinite scroll using React-virtualized.

## Project setup

Please use following steps to setup project locally:
1. git clone https://github.com/mayurgaud/react-test

- For installation:
 npm install
- For running:
 npm start
