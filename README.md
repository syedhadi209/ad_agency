# Ad Campaign Management System

## Table of Contents

1. [Overview](#overview)
2. [Project Setup](#project-setup)
3. [Database Setup](#database-setup)
4. [Project Structure](#project-structure)
5. [Controllers & Endpoints](#controllers-endpoints)
6. [Cron Jobs](#cron-jobs)
7. [Running the Application](#running-the-application)
8. [Contributing](#contributing)

---

## Overview

This system manages advertising campaigns for multiple brands, each with its own daily and monthly budget. The system ensures that:

- Campaigns are activated/deactivated based on the brand's daily and monthly budgets.
- Campaigns respect specific time-based constraints (dayparting).
- Daily and monthly budgets are reset at the start of each day and month.
- Automated cron jobs handle all of the above logic without manual intervention.

### Key Features:

- **Brand Management**: Create and manage brands with their daily and monthly budgets.
- **Campaign Management**: Create campaigns, set dayparting hours, and activate/deactivate campaigns based on budget and time.
- **Budget Management**: Monitor daily and monthly spending.
- **Automatic Resets**: Daily and monthly budget resets.
- **Cron Jobs**: Automate the logic for budget resets, campaign activation, and dayparting.

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/syedhadi209/ad_agency.git
cd ad_agency
```

### 2. Install Dependencies using Yarn

```bash
yarn install
```

This installs the necessary dependencies including NestJS, TypeORM, and other required packages.

---

## Database Setup

### 1. Install PostgreSQL

- Install PostgreSQL on your local machine or use a cloud PostgreSQL service (e.g., AWS RDS, Heroku Postgres).
- Make sure to create a database for the project.

### 2. Database Configuration

In your `.env` file, add the following environment variables:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=ad_campaign_db
PORT=3000
```

### 3. Entities & Migration

The `Brand` and `Campaign` entities are defined in `src/database/entities/`. Ensure that your database is connected and the tables are created. You can also run the migrations with TypeORM if necessary.

---

## Project Structure

```
ad-campaign-management/
├── src/
│   ├── app.module.ts          # Main module for the application
│   ├── database/
│   │   ├── entities/          # Database entities (Brand, Campaign)
│   │   └── database.module.ts # Database module
│   ├── brand/
│   │   ├── brand.controller.ts
│   │   ├── brand.service.ts
│   │   └── brand.module.ts
│   ├── campaign/
│   ├── └── campaign_dto/
│   │       └─ index.ts
│   │   ├── campaign.controller.ts
│   │   ├── campaign.service.ts
│   │   ├── campaign-cron.service.ts # Cron job for dayparting
│   │   └── campaign.module.ts
│   ├── cron-jobs/
│   │   └── cron.service.ts   # Cron job scheduler for resets
│   └── main.ts               # Entry point for the application
├── .env                       # Environment variables
├── package.json               # Package configuration (with Yarn)
└── yarn.lock                  # Yarn lock file
```

---

## Controllers & Endpoints

### Brand Controller

#### 1. Create a Brand

- **Endpoint**: `POST /brands`
- **Request Body**:

```json
{
  "name": "Brand Name",
  "dailyBudget": 1000,
  "monthlyBudget": 30000
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Brand Name",
  "dailyBudget": 1000,
  "monthlyBudget": 30000,
  "dailySpend": 0,
  "monthlySpend": 0,
  "lastReset": "2023-12-01T00:00:00.000Z"
}
```

#### 2. Get All Brands

- **Endpoint**: `GET /brands`
- **Response**:

```json
[
  {
    "id": 1,
    "name": "Brand Name",
    "dailyBudget": 1000,
    "monthlyBudget": 30000,
    "dailySpend": 0,
    "monthlySpend": 0,
    "lastReset": "2023-12-01T00:00:00.000Z"
  }
]
```

#### 3. Update Brand's Budget

- **Endpoint**: `PATCH /brands/:id/budget`
- **Request Body**:

```json
{
  "dailyBudget": 1200,
  "monthlyBudget": 35000
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Brand Name",
  "dailyBudget": 1200,
  "monthlyBudget": 35000,
  "dailySpend": 0,
  "monthlySpend": 0,
  "lastReset": "2023-12-01T00:00:00.000Z"
}
```

---

### Campaign Controller

#### 1. Create a Campaign

- **Endpoint**: `POST /campaigns`
- **Request Body**:

```json
{
  "name": "Campaign Name",
  "brandId": 1,
  "activeHours": [9, 10, 11]
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Campaign Name",
  "brandId": 1,
  "activeHours": [9, 10, 11],
  "isActive": true
}
```

#### 2. Get All Campaigns

- **Endpoint**: `GET /campaigns`
- **Response**:

```json
[
  {
    "id": 1,
    "name": "Campaign Name",
    "brandId": 1,
    "activeHours": [9, 10, 11],
    "isActive": true
  }
]
```

#### 3. Update Campaign Status (Activate/Deactivate)

- **Endpoint**: `PATCH /campaigns/:id/status`
- **Request Body**:

```json
{
  "isActive": false
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Campaign Name",
  "brandId": 1,
  "activeHours": [9, 10, 11],
  "isActive": false
}
```

---

## Cron Jobs

The cron jobs are set to run automatically based on the time intervals defined in the `src/cron-jobs/cron.service.ts` file.

### Daily Reset Cron Job

- **Cron Expression**: `0 0 * * *`
- **Trigger**: Runs daily at midnight to reset the daily spend for all brands and reactivate campaigns if the daily budget has not been reached.

### Monthly Reset Cron Job

- **Cron Expression**: `0 0 1 * *`
- **Trigger**: Runs on the first day of every month to reset the monthly spend for all brands and reactivate campaigns if the monthly budget has not been reached.

---

## Running the Application

1. **Start the Application**:

```bash
yarn start
```

This starts the NestJS application and listens on the port defined in the `.env` file (default `3000`).

2. **Access the Application**:

Open your browser and navigate to `http://localhost:3000`.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

This document outlines the basic setup and flow of the Ad Campaign Management System. Please feel free to modify or extend it according to your specific needs!
