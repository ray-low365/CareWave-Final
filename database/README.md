# CareWave Database

This directory contains all database-related files and configurations for the CareWave Clinical Management System.

## Structure

- `models/` - Database models and schemas
- `migrations/` - Database migration scripts
- `seeds/` - Seed data for development and testing
- `config/` - Database configuration files

## Database Schema

The CareWave system uses Supabase as its database provider with the following main tables:

- `patients` - Patient information and medical records
- `appointments` - Patient appointment scheduling and management
- `staff` - Healthcare staff and administrative personnel
- `inventory` - Medical supplies and equipment inventory
- `billing` - Patient billing and payment records

## Setup

1. Create a Supabase account and project
2. Run the migration scripts to set up the database schema
3. Seed the database with initial data if needed
