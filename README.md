# **Wheelter**

## About wheelter

That's my personal project to try out [https://blitzjs.com/](https://blitzjs.com/) full-stack React framework. It's not finished, but some of the features works.

# Landing page

![Landing page](https://github.com/pienas/wheelter/blob/main/public/landing.png?raw=true)

# Date picker

![Date picker](https://github.com/pienas/wheelter/blob/main/public/date-picker.png?raw=true)

# Partners landing page

![Partners landing page](https://github.com/pienas/wheelter/blob/main/public/partners-landing.png?raw=true)

# Login page

![Login page](https://github.com/pienas/wheelter/blob/main/public/login.png?raw=true)

# Dashboard

![Dashboard](https://github.com/pienas/wheelter/blob/main/public/dashboard.png?raw=true)

# Notifications

![Notifications](https://github.com/pienas/wheelter/blob/main/public/notifications.png?raw=true)

# Orders panel

![Orders panel](https://github.com/pienas/wheelter/blob/main/public/orders.png?raw=true)

# Share modal

![Share modal](https://github.com/pienas/wheelter/blob/main/public/share.png?raw=true)

# Settings page

![Settings page](https://github.com/pienas/wheelter/blob/main/public/settings-main.png?raw=true)

# Employees page

![Employees page](https://github.com/pienas/wheelter/blob/main/public/settings-employees.png?raw=true)

# Add employee

![Add employee](https://github.com/pienas/wheelter/blob/main/public/employee-invite.png?raw=true)

# Remove employee

![Remove employee](https://github.com/pienas/wheelter/blob/main/public/employee-remove.png?raw=true)

# Contact information page

![Contact information page](https://github.com/pienas/wheelter/blob/main/public/settings-contacts.png?raw=true)

## Set up

Install Blitz and yarn globally

```
npm i -g blitz yarn
```

Install local dependencies

```
yarn
```

Install PostgreSQL - [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Open pgAdmin and create root user, then create a database for wheelter.

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/wheelter
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/wheelter_test
```

Run app in development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run Prisma Studio for easy-access database.

```
blitz prisma studio
```

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  help      display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## Learn more

Read the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started) to learn more.

The Blitz community is warm, safe, diverse, inclusive, and fun! Feel free to reach out to us in any of our communication channels.

- [Website](https://blitzjs.com/)
- [Discord](https://discord.blitzjs.com/)
- [Report an issue](https://github.com/blitz-js/blitz/issues/new/choose)
- [Forum discussions](https://github.com/blitz-js/blitz/discussions)
- [How to Contribute](https://blitzjs.com/docs/contributing)
- [Sponsor or donate](https://github.com/blitz-js/blitz#sponsors-and-donations)
