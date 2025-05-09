# REST API Authentication and Authorization with 2FA

This project is a Node.js Express server that provides robust user authentication and authorization mechanisms including JWT-based access and refresh tokens, Google OAuth, and optional Time-based One-Time Password (TOTP) two-factor authentication (2FA).

## Features

- User registration and login
- JWT access and refresh tokens
- Token invalidation and refresh handling
- Two-Factor Authentication (2FA) with TOTP and QR Code
- Google OAuth 2.0 login
- Role-based access control (admin, moderator, member)

## Tech Stack

- Node.js & Express
- NeDB (nedb-promises)
- bcryptjs
- jsonwebtoken
- otplib (TOTP)
- qrcode
- node-cache
- Passport.js (Google OAuth)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone git@github.com:Mohamed-Sheriif/authentication-and-authorization.git
   cd authentication-and-authorization
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `config.js` file with:

   ```js
   module.exports = {
     accessTokenSecret: "your-access-token-secret",
     refreshTokenSecret: "your-refresh-token-secret",
     accessTokenExpiresIn: "15m",
     refreshTokenExpiresIn: "7d",
     cacheTemporaryTokenPrefix: "2fa-temp-token:",
     cacheTemporaryTokenExpiresInSeconds: 300,
   };
   ```

4. Start the server:

   ```bash
   node index.js
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT tokens
- `POST /api/auth/login/2fa` - Verify TOTP and get tokens if 2FA enabled
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout from current device
- `GET /api/auth/logoutAll` - Logout from all devices

### Two-Factor Authentication

- `GET /api/auth/2fa/generate` - Generate TOTP secret and QR code (PNG)
- `POST /api/auth/2fa/validate` - Validate TOTP and enable 2FA

### Google OAuth

- `GET /auth/google` - Initiate Google login
- `GET /auth/google/callback` - OAuth2 callback

### Protected Routes

- `GET /api/users/current` - Get current logged-in user's data
- `GET /api/admin` - Access for `admin` only
- `GET /api/moderator` - Access for `admin` and `moderator`

## Middleware

- `ensureAuthenticated` - Verifies access tokens
- `authorize([roles])` - Role-based route protection

## Notes

- Uses `NeDB` (a local file-based DB) for simplicity. For production use, switch to MongoDB or PostgreSQL.
- Refresh tokens are stored and invalidated in the database.
- Logout invalidates tokens to prevent reuse.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to contribute or customize based on your project needs!
