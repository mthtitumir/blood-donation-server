import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        jwt_secret: process.env.JWT_ACCESS_SECRET,
        expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
        refresh_token_secret: process.env.JWT_REFRESH_SECRET,
        refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
        reset_pass_secret: process.env.RESET_PASS_TOKEN,
        reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN
    },
    reset_pass_link: process.env.RESET_PASS_LINK,
    emailSender: {
        email: process.env.EMAIL_SENDER,
        app_pass: process.env.APP_PASS
    },
    ssl: {
        storeId: process.env.STORE_ID,
        storePass: process.env.STORE_PASSWD,
        successUrl: process.env.SUCCESS_URL,
        cancelUrl: process.env.CANCEL_URL,
        failUrl: process.env.FAIL_URL,
        sslPaymentApi: process.env.SSL_PAYMENT_API,
        sslValidationApi: process.env.SSL_VALIDATION_API
    }
}