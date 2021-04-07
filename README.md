# React Survey

A customizable survey.

Live demo [here](https://mikefoss.com/react-survey-demo/).

### Tech Stack

* **Client**: React
* **Server**: Lightweight PHP script
* **Storage**: A single text file

### Requirements

* `npm` and `node` installed locally
* A web server with
  * PHP
  * A public-facing URL
  * A writeable folder for your survey code

## Quick Start

1. Clone repo and run `npm install`.

1. Edit `/src/survey-data.js` file and create your survey.
A sample survey is given at `/src/survey-data.example.js`;
you can copy/paste from there for some example questions.

1. Edit the `/package.json` file and change the `homepage` property
to be the full path to where you will deploy your survey
(no trailing slash - e.g. http://my.web.site/my/survey).

1. Run `npm start` to see an example of the survey.
Note that submitting the survey will send a request
to a PHP script in `homepage`. This script won't be there
until you deploy, and even if it is there they will likely fail
due to CORS (see `/CORS.md` if you want to get around this).

1. If your web server is **not** serving over SSL (i.e. `https` vs. `http`),
delete `/public/.htaccess`, as it forces all traffic to be redirected
over SSL.

1. Run `npm run build` to prepare your survey for deployment.
Copy the contents of `/build` to `homepage` on your server to deploy.
Make sure that PHP has write access to `submissions.txt`,
as it will write the results of your survey responses
to the same location.

1. View survey responses in the `submissions.txt` file
in the `homepage` folder.

## Available Scripts (based on `create-react-app`)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
