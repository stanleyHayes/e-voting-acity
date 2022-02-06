import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config({});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendVerificationSMS = async (recipientPhone, message) => {
    try {

        await client.messages
            .create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: recipientPhone
            });
        return {success: true, code: 200, message: 'Verification code sent'};
    }catch (e) {
        return {success: false, code: e.statusCode, message: 'Could not send Verification Code'}
    }
}

export const SMS_VERIFICATION = {sendVerificationSMS};
