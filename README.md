# Elma TCG 

To learn the game rules check [the guides](./guides/elma-tcg.md).

## How to run

1. Clone the repository.
2. Run `npm install`.
3. Run `heroku login`.
5. Run `heroku git:remote -a elma-tcg` to connect to the app.
6. Create `.env` file following the `.env-example` file (use `npm run config-vars` to check for `DATABASE_URL`).
7. Run `npm run dev` for development.
8. Open `http://localhost:5000/`.

## Enter to database shell

1. Install [`local psql command`](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup).
2. Run `npm run db`.

### Usefull commands

- `\dt`: list tables.
- `\d table_name`: show table with details.
- `\?`: list all available commands.