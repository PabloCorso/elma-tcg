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
- `\d` or `\d table_name`: show table with details.
- `\dT` or `\dT+ type_name`: show user defined types.
- `\?`: list all available commands.

Quick PSQL examples: https://www.postgresqltutorial.com/

#### Add column
```sql
ALTER TABLE table_name
ADD COLUMN new_column_name data_type constraint;
```

#### Drop column
```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

#### Update column value
```sql
UPDATE table_name
SET column_name = new_value 
WHERE id = identifier;
```

### Delete values from table
```sql
DELETE FROM table_name WHERE condition;
```