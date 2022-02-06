import dotenv from "dotenv";
import axios from "axios";

dotenv.config({});


const sendVerificationEmail = async (user, message) => {
    try {
        const response = await axios({
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
        console.log(response);
        return {success: true, code: 200, message: 'Verification Email Sent'}
    } catch (e) {
        console.error(e)
        return {success: false, code: e.statusCode, message: e.message}
    }
}

export const VERIFICATION_EMAIL = {sendVerificationEmail};
