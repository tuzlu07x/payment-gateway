# Payment Gateway

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
Install dependencies:
```

3. Set up your environment variables:
   Create a `.env` file in the root of the project and add the necessary configuration variables.

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
RABBITMQ_URL=amqp://localhost
```

4. Run the application:

```
npm start
```

## Usage

The application provides a basic API for creating transactions. An example route is available in src/app.js. To test, run the application and access the specified route.

## Project Structure

The project is organized as follows:

- **migrations:** Contains Sequelize database migration files.
- **models:** Sequelize models for the database tables.
- **validations:** Validation logic for transactions.
- **src/Payment:** Classes related to transactions.
- **Queue:** RabbitMQ connection and queue handling.
- **src/app.js:** Express application setup and routes.
- **src/sequelize.js:** Sequelize connection setup.
- **scripts:** Scheduled jobs for processing transactions and wallet updates.

## Dependencies

- **amqplib:** RabbitMQ client for Node.js.
- **dotenv:** Loads environment variables from a .env file.
- **express:** Web framework for Node.js.
- **joi:** Object schema description language and validator for JavaScript objects.
- **mysql2:** MySQL library for Node.js.
- **node-schedule:** Job scheduling for Node.js.
- **sequelize:** Promise-based ORM for Node.js.
