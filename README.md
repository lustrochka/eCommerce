# eCommerce

Welcome to our eCommerce app! 

It will be an online shopping portal that will provide users with a user-friendly interface. Users will be able to browse the range of products, view detailed descriptions, add the products they like to the cart and proceed to checkout. The app will include features such as user registration and login, product search, product categorization and sorting to make the shopping experience easier and more convenient.
***
## Technology Stack
1. <img src="https://img.shields.io/badge/HTML-3CB371?style=for-the-badge&logo=HTML5&logoColor=DC143C"/>
2. <img src="https://img.shields.io/badge/CSS-3CB371?style=for-the-badge&logo=css3&logoColor=00CED1"/>
3. <img src="https://img.shields.io/badge/JavaScript-3CB371?style=for-the-badge&logo=javascript&logoColor=FFD700"/>
4. <img src="https://img.shields.io/badge/TypeScript-3CB371?style=for-the-badge&logo=typescript&logoColor=0000CD"/>
5. <img src="https://img.shields.io/badge/Prettier-3CB371?style=for-the-badge&logo=prettier&logoColor=DB7093"/>
6. <img src="https://img.shields.io/badge/ESLint-3CB371?style=for-the-badge&logo=eslint&logoColor=8A2BE2"/>
7. <img src="https://img.shields.io/badge/git-3CB371?style=for-the-badge&logo=git&logoColor=FF6347"/>
8. <img src="https://img.shields.io/badge/Webpack-3CB371?style=for-the-badge&logo=webpack&logoColor=1E90FF"/>
5. <img src="https://img.shields.io/badge/Jest-3CB371?style=for-the-badge&logo=jest&logoColor=8B008B"/>
***
## Description scripts
- `npm install` - will install the dependencies to the local `node_modules` folder. Will install all modules listed as dependencies in `package.json`.
- `npm run start` or `npm start` - launches the development server that provides live reloading. This should be used for development only.
- `npm run build` - creates a `dist` directory with the production build of the application.
- `npm run deploy` - runs `npm run build` and sends the contents of the `dist` folder to the `gh-pages` branch for deployment
- `npm run lint` - runs the `eslint` code analyzer and `prettier` code formatter to quickly find problems.
- `npm run fix` or `npm run lint -- --fix` - fixes errors found by `eslint` and `prettier` without requiring additional steps.
- `npm run format` - fixing code using the `prettier` code formatter.
- `npm run ci:format` - checking all files using the `prettier` code formatter.
- `npm run test` or `npm test` - running Jest tests.
***
### Detailed instructions for setting up and running the project locally
1. Clone the repository ([detailed instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
2. In the terminal, run the command `npm install`
3. After installing all modules and dependencies, run the command `npm run build`
4. Open the html file in the created folder `dist` using LiveServer.
