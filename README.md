# Sense Pro

## Running Locally

Make sure you have npm or Bun installed.

### Start Docker Containers

```bash
docker compose -f ./docker-compose.local.yaml up -d
```

### Database Migrations and Seeding

Make sure `env.local` has the `DATABASE_URL` set.

To seed the database, run the following:

```bash
npm run db:dev
# or
bun db:dev
```

This will create a user to access the UI with the following credentials:

- Email: x@x.com
- Password: password123

### Run the Development Server

Run the development server:

```bash
npm run dev
# or
bun dev
```

## Running Production like locally

Make sure you have npm or Bun installed. Also Make

### Start Docker Containers

```bash
make build-local
make start-local
```

### Database Migrations and Seeding

Make sure `env.local` has the `DATABASE_URL` set.

To seed the database, run the following:

```bash
npm run db:dev
# or
bun db:dev
```

### Stop Docker Containers

```bash
make stop-local
```
