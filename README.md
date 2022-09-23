# Kanji2Go

# Project Description

Kanji2go is a custom kanji practice sheet generator, and kanji testing site. The goal of the project is to create a student teaching aid for learning Japanense. 

## Developer Aside
 
 My personal goal was to get practice using Chakra,React, React DnD, HTML2Canvas and Javascript. React DnD is used to allow users to drag and drop kanji aroung in the practice sheet generator to fit their personal needs. HTML2Canvas was used to generate a downloadable pdf of the users created kanji sheet. This site also has its own web url, provided by Go Daddy. 
 
 The hardest part was learning how to incorporate React DnD, HTMl2Canvas together and make them work on mobile, as well as learning how to shrink a canvas on different screen sizes.

 
 
## How to Use 

See the code snippet below to run the project or go to https://www.kanji2go.com/home

On the webpage you can click on pages dropdown to navigate to the following sections.

### About Us

This page holds a brief snippet about me and why I created the site.

### Premade Kanji Sheets
 This pages contains sortable premade kanji sheets. You can click on the eye icon to preview what is contained inside the pdf before downloading it.        There is a sort menu on the left that allows you to filter by JLPT testing level, and sheet type.
 
 ### Kanji Sheet Creator
This pages allows the user to create a custom kanji sheet and download it once satisfied. You can click on the + button to begin the kanji selection process. Once selected you can drag them around to any row you wish. 
 
Clicking the new page button will createa a new page for you to drag kanji to. There is a bug when you scroll the item will move off your cursor. This    issue has been found to be with the DnD React library. The code will be updated once the libarary has been updated.

To download the sheet click on preview then the download button.
 
 ### Kanji Quiz
This page allows you to quiz yourself on your knowledge of kanji. By, creating a customizable quiz, on which you can draw  kanji based on the prompt. Once all questions haved been answered you can click sumbit and compare your answers with the answer key. 

Button Breakdown
  New Quiz- prompts the user to create a new quiz and clears the current one
  Questions - this button becomes active once the user creates a quiz and allows them to naviagte to each question, as well as track if an answer has                 been given for the prompt
  Clear - clears the current canvas
  Submit - submits what the user has drawn
  Erase - turns the users cursor into an eraser, clicking it again will turn it off
  Arrow Buttons - are used to navigate the prompts. 

# Getting Started with Create React App 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
