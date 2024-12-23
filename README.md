# What is this?
This is the API for an application for a user to manage a to-do list

# How to setup the database?
The database is built using the Prisma ORM. To initialize the database, create a new database
in MySQL named, "nooro_todo". Once you have your database setup with a root user, add a .env file
the following:

`DATABASE_URL="mysql://root:password@localhost:3306/nooro_todo"`

switching out the port number and host for the database server if applicable.

Then run `npx prisma generate` to generate the Prisma file

# How to run?

Before the API is run, you need to have a MySQL database setup and a .env file containing
the following:

This API can be run by having node installed and running `npm install`, followed
by `npm run dev`. A production build of this API can also be made by running
`npm run build` and will be found in the `dist` folder.
