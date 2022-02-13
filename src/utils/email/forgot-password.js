import dotenv from "dotenv";
import axios from "axios";

dotenv.config({});


const sendForgotPasswordEmail = async (user, message) => {
    try {
        await axios({
            data: {
                from: {
                    email: process.env.FROM_EMAIL
                },
                personalizations: [
                    {
                        to: [{email: user.email}],
                        dynamic_template_data: {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            otp: message.otp,
                            link: message.link,
                            os: message.os,
                            browser: message.browser
                        },
                    }
                ],
                template_id: process.env.SENDGRID_TEMPLATE_ID
            },
            headers: {
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: 'https://api.sendgrid.com/v3/mail/send'
        });
        return {success: true, code: 200, message: 'Email Sent'}
    } catch (e) {
        return {success: false, code: e.statusCode, message: e.message}
    }
}

export const FORGOT_PASSWORD = {sendForgotPasswordEmail};
