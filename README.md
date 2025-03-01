# TalentLink Backend

A modern freelance marketplace backend built with NestJS, featuring secure authentication, real-time messaging, and escrow payments.

## Overview

TalentLink is a comprehensive backend solution for connecting freelancers with clients. It provides a robust API for managing user profiles, job postings, secure payments, and real-time communication.

## Features

- 🔐 JWT Authentication
- 👥 User Management (Freelancers & Clients)
- 💼 Job Posting System
- 💰 Secure Payment Processing
- 💬 Real-time Messaging
- 📚 API Documentation

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** Passport.js & JWT
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest & Supertest

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v14+)
- npm/yarn

### Installation

1. Clone the repository
2. Install dependencies
3. Create a `.env` file based on `.env.example`
4. Run the development server

### Running the Server

```bash
npm install
npm run start:dev
```

### API Documentation

The API documentation is available at `http://localhost:3000/api`

### Database Setup

1. Install PostgreSQL
2. Create a database named `talentlink_dev`
3. Run the migrations

```bash
npm run migrate
```

### Authentication

The API uses JWT for authentication. The token is sent in the Authorization header with the Bearer prefix.


### Testing

The API includes unit tests using Jest. To run the tests, use the following command:

```bash
npm run test
```

### Contributing

Contributions are welcome! Please create a pull request or open an issue for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
