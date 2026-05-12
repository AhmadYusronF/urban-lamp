# Notes App Backend

A robust RESTful API for managing personal notes, featuring user authentication, collaboration, and asynchronous export capabilities.

## 🚀 Features

- **User Management**: Full CRUD for user profiles and secure registration.
- **Authentication**: Secure login system using JWT with Access and Refresh Token rotation.
- **Notes Management**: Create, read, update, and delete notes with ownership verification.
- **Collaboration**: Share notes with other users, allowing them to view and edit shared content.
- **Asynchronous Exports**: Request note exports via email, processed in the background using RabbitMQ.
- **Input Validation**: Strict request schema validation using Joi.
- **Standardized Responses**: Consistent API response format for all endpoints.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Migration Tool**: node-pg-migrate
- **Authentication**: JSON Web Token (JWT) & bcrypt
- **Message Broker**: RabbitMQ
- **Validation**: Joi
- **ID Generation**: nanoid

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL
- RabbitMQ Server

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-app-back-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Copy the example environment file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database and authentication keys:
   ```env
   PGHOST=localhost
   PGUSER=your_db_user
   PGPASSWORD=your_db_password
   PGDATABASE=notes_db
   PGPORT=5432
   REFRESH_TOKEN_KEY=your_refresh_token_secret
   ACCESS_TOKEN_KEY=your_access_token_secret
   RABBITMQ_SERVER=amqp://localhost
   PORT=5000
   ```

4. **Database Migrations**
   Run the migrations to set up the database schema:
   ```bash
   npm run migrate up
   ```

5. **Run the Application**
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/authentications` | Login & get tokens | No |
| `PUT` | `/authentications` | Refresh access token | No |
| `DELETE` | `/authentications` | Logout (revoke refresh token) | No |

### Users
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/users` | Register new user | No |
| `GET` | `/users` | List users (search by username) | No |
| `GET` | `/users/:id` | Get user profile | No |
| `PUT` | `/users/:id` | Update user profile | Yes |
| `DELETE` | `/users/:id` | Delete user account | Yes |

### Notes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/notes` | Create a new note | Yes |
| `GET` | `/notes` | Get notes (owned or shared) | Yes |
| `GET` | `/notes/:id` | Get note details | Yes |
| `PUT` | `/notes/:id` | Update note | Yes |
| `DELETE` | `/notes/:id` | Delete note | Yes |

### Collaborations
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/collaborations` | Share note with another user | Yes |
| `DELETE` | `/collaborations` | Remove a collaborator | Yes |

### Exports
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/exports/notes` | Request notes export to email | Yes |

## 🏗️ Architecture

The project follows a **Controller-Repository** pattern:
- **Routes**: Define endpoints and attach middleware.
- **Controllers**: Handle request/response logic and orchestration.
- **Repositories**: Interface directly with the PostgreSQL database.
- **Services/Producers**: Handle external integrations (e.g., RabbitMQ).
- **Middleware**: Handle authentication and Joi validation.
