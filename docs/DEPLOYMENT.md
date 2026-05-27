# Deployment

## MongoDB Atlas

1. Create an Atlas database named `zilist`.
2. Add the connection string to `backend/.env` as `MONGODB_URI`.
3. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
4. Run `npm run seed` from `backend/`.

## Cloudinary

Set:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

The payment upload route uses Cloudinary folder `zilist/payment-proofs`.

## Email

Set SMTP variables in `backend/.env`. For Gmail, use an app password instead of the account password.

## AI Providers

Set either:

- `OPENAI_API_KEY` and `OPENAI_MODEL`
- `GEMINI_API_KEY` and `GEMINI_MODEL`

If neither is configured, the chatbot uses the built-in ZILIST knowledge fallback.

