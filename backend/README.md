# CareWave Backend

This directory contains the backend API server for the CareWave Clinical Management System.

## Structure

- `src/` - Source code for the backend
  - `controllers/` - API route controllers
  - `routes/` - API route definitions
  - `middleware/` - Express middleware
  - `services/` - Business logic and services
  - `models/` - Data models
  - `utils/` - Utility functions
  - `config/` - Configuration files
- `tests/` - Test files

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add your Supabase URL and API key

3. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

The API provides endpoints for managing:

- Patients
- Appointments
- Staff
- Inventory
- Billing

API documentation is available at `/api-docs` when the server is running.
