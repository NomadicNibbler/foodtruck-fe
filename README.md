# Gearfull

This is a Mod 4 Project by [Elizabeth Hahn](https://github.com/elizhahn), [Joel Thomas]()

### Deployed App: [The Nomadic Nibbler](https://the-nomadic-nibbler.herokuapp.com/)


## Outline

1. [Project Overview](#project-overview)
2. [App Overview](#app-overview)
3. [Learning Goals](#learning-goals)
4. [Tech Stack](#tech-stack)
5. [Features](#features)
6. [Instructions for Installation](#instructions-for-installation)
7. [Future Iterations](#future-iterations)
8. [Project Reflections](#project-reflections)


## Project Overview


The goal of this project was to confirm my skills using React, React-Router, Asynchronous Javascript, and Cypress to build an application that solves a problem for a small niche audience. Github project board was utilized to organzize user stories, personas, wireframes, and acceptance criteria.  


## App Overview

The Nomadic Nibbler is a mobile first food truck application that allows users to set a location and view food trucks in their immediate area. Users can see their location on a map, view a list of available trucks, and get detailed information about each truck. Location can be changed if you have a new destination and the map will update. This app was converted to a progressive web app (PWA) and allows the user download the application to their phone's homescreen and access their recent session when offline or the internet is spotty.  
 
## Learning Goals
 
 - Implementing a PWA to design a mobile first application that behaves like a native app
 - Working with a backend team to design appropriate data structures for MVP features
  
## Tech Stack

### Front-End:
- JavaScript ECMA6
  - React (create-react-app)
  - React Router
- HTML5
- CSS3
  - SASS / SCSS

### Testing:
- Cypress
  - Mocha
  - Chai

## Features

### Login

![]()


### New User

![]()

### Map

![]()

### Truck List

![]()

### Truck Details

![]()


### Responsive Design

![]()

### Accessibility

![]()

### Offline ability


## Instructions for Installation
   - Can visit the deployed app [here](https://the-nomadic-nibbler.herokuapp.com/)
   
 OR
 
  - To run this application on your local machine, clone down the 
         - [frontend repo](https://github.com/NomadicNibbler/foodtruck-fe) 
   
  - change into the root directory from the command line, and run `npm install`. 
    
  - Then run `npm   start` to open the application locally. If you aren't taken there, visit `http://localhost:3000/`
    
  - To run the test suite locally, you will also need to run the command `npm i -D cypress` from the command line.
    
  - Once it  has installed, run `npx cypress open`, then select the `app_spec.js` test file. 
    
  - Note: you will need to run the application locally (start the server with `npm start` from the root directory on the command line) in order to run the automated tests.

## Future Iterations




## Project Reflections

### Challenges

  -Implementing a PWA hosted many hurdles
     - keeping the cache up to date and using a network first approach. The service worker needed to be setup to use the network first to prevent it from returning old locations a user used earlier in their session. In addition the cache needed to be activated and cleared
     

### Wins


