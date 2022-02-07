import dotenv from "dotenv";
import axios from "axios";

dotenv.config({});


const sendInvitationEmail = async (user, message) => {
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
                            email: user.email,
                            code: message.code,
                            link: message.link,
                            inviter_email: message.inviter_email,
                            inviter_name: message.inviter_name
                        },
                    }
                ],
                template_id: process.env.SENDGRID_ADMIN_INVITATION_TEMPLATE
            },
            headers: {
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: 'https://api.sendgrid.com/v3/mail/send'
        });
        return {success: true, code: 200, message: 'Invitation Email Sent'}
    } catch (e) {
        console.error(e)
        return {success: false, code: e.statusCode, message: e.message}
    }
}

export const INVITATION_EMAIL = {sendInvitationEmail};
