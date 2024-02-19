# Feirinha Agroecológica API

## Setup

### Clone the Repository

```bash
git clone https://github.com/ruangustavo/feirinha-agroecologica-api
```

### Start PostgreSQL

```
docker compose up -d
```

### Running
Copy the .env.example

```
cp .env.example .env
```

Provide Execution Permission

```
chmod +x start.sh
```

Execute the Initialization ScriptA

```
./start.sh
```


### Running Tests

```
npm test
```

### Utils

#### Reset Database

```
npx prisma migrate reset
```

This command performs the following tasks:

- Drops the database
- Creates a new database
- Applies all migrations
- Generates the Prisma client
