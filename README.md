# React with Next.js CRUD
React JS web application that handles CRUD operations (Create, Read, Update, Delete) with Next.js framework.

![Image](https://raw.githubusercontent.com/brunosdecampos/React-CRUD/main/public/images/project-preview.png)

## What is React JS?
React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.

## This web app contains the following dependencies:
- `Next.js`: An open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.
- `Typescript`: A free and open source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. It is designed for the development of large applications and transpiles to JavaScript. 
- `PostgreSQL`: A free and open-source relational database management system emphasizing extensibility and SQL compliance.
- `Prisma`: An ORM (Object-relational mapping) that helps app developers build faster and make fewer errors.
- `Tailwind CSS`: An open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.
- `Sass`: A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.

## How to install the application?
- Clone this repository
- Open the project with you choice of IDE or code editor
- Open terminal and cd into its project folder
- Install all project dependencies with the following command: `npm i`
- Start Postgres database
- Run the application: `npm run dev`
- Launch Prisma: `npx prisma studio`
- Have fun!

## How to update the database?
For any changes in the database structure, please update the following file `prisma` > `schema.prisma`. Then run the migration command on the terminal `npx prisma migrate dev --name init` where `init` is the name of your migration (for instance: `added_phone_number`). You may need to restart the server after the migration.

### How to merge migrations?
In case you have more than one migration in the same Pull Request, it is considered a good practice to squash them into one, this way you'll have one migration per PR. To achieve that, delete the contents of prisma/migration then run the following command:
`npx prisma migrate dev --name squashed_migrations`
