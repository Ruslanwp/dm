# Device Management App

## Setup

To get started with the Device Management App, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/device-management-app.git
   cd device-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

To run the app in development mode, use the following command:

```bash
npm run start:dev
```

This will start both the frontend and backend servers:

- Backend: http://localhost:4000
- Frontend: http://localhost:3000

## Database Management

This project uses Drizzle ORM for database management. To launch Drizzle Studio for visual database management:

```bash
npm run db:studio -w backend
```