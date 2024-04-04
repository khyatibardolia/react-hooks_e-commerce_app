# Getting Started with Create React App

This project is a simple excursions application having functionalities such as:

- Get excursion List from a Rest API.
- Excursion list having pagination with 6 products per page.
- User can Add/Remove excursion from Cart.
- User can Add/Remove excursion from Wishlist.
- User can Add excursion to cart from Wishlist.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run format`

Prettier is an opinionated code formatter. If you want to format your code, this command will take care of it.

### `npm run lint`

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.To achieve this, use this command.

### `npm run cypress:open`

Launches the test runner for e2e testing with browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# React / Docker build setup to run app in production mode.

Deploy a create-react-app into production with docker multi-stage build.

Build the Docker image:

```
docker build . -t js_challenge_jagaad_khyati-bardolia
```
To see the list images built in your system, run the following command:

```
docker images
```

Run your application-container with:

```
docker run -p 8000:80 js_challenge_jagaad_khyati-bardolia
```

Now open http://localhost:8000 in your browser to check its running !
