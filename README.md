# Setting up the database

1. Login as the root `postgres` user using `psql`

```bash
psql -U postgres
```

> **Note**
> If the `psql` command (the CLI for PostgreSQL) is not working in CMD or Powershell, follow [this guide](https://www.commandprompt.com/education/how-to-fix-psql-command-not-found-error-in-postgresql/) to fix the problem or search on YouTube.

2. Create the app database

```sql
CREATE DATABASE zvinoreva_bus_reservation;
```

3. Connect to the app database

```bash
\c zvinoreva_bus_reservation
```

4. Create a user in the database

```sql
CREATE ROLE zvinoreva WITH LOGIN PASSWORD 'zvinoreva';
```

5. Grand all permissions on the `zvinoreva_bus_reservation` to the `zvinoreva` user.

```sql
GRANT ALL ON SCHEMA public TO zvinoreva;
```

6. Connect to the database using the new user `zvinoreva`

```bash
\c zvinoreva_bus_reservation zvinoreva
```

7. Test the permissions by create a temporary table

```sql
CREATE TABLE tmp (id SERIAL PRIMARY KEY);
```

This should give the output below if permissions were granted:

```bash
CREATE TABLE
```

8. Drop the `tmp` table (optional)

```sql
DROP TABLE tmp;
```

This should give the output below if the table was dropped:

```bash
DROP TABLE
```

9. Disconnect from the database:

```bash
\q
```

# Setting up the application

1. Make sure you have NodeJS installed

```bash
node --version
```

This should give an output like:

```bash
v21.7.2
```

2. Clone the application repository

```bash
git clone https://github.com/chiroro-jr/bus_reservation_system.git
```

3. Open the `bus_reservation_system/` directory in VS Code
4. Open the terminal in VSCode and install dependencies with

```bash
npm install
```

5. Run the migrations to set up the database

```bash
npm run migrate
```

6. Inserting data into the database

- Connect to the database

```bash
psql -U zvinoreva zvinoreva_bus_reservation
```

- Copy the SQL code in `migrations/0001_insert_locations.sql` and paste into the terminal to insert locations into the `locations` table.
- Copy the SQL code in `migrations/0002_insert_routes.sql` and paste into the terminal to insert routes into the `routes` table.
- Copy the SQL code in `migrations/0001_insert_trips.sql` and paste into the terminal to insert trips into the `trips` table.
- Copy the SQL code in `migrations/0001_insert_roles.sql` and paste into the terminal to insert roles into the `roles` table.

# Running the application

1. Build the application

```bash
npm run build
```

2. Start the application

```bash
npm run preview
```

3. Open the application on `http://localhost:4173/`
