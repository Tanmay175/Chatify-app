import { resendClient } from "../lib/resend.js"
import { emailTemplate } from "./emailTemplate.js"

export const sendwelcomeEmail = async (email, name, clientURL) => {

    const { data, error } = await resendClient.emails.send({
        from: "Chatify <onboarding@resend.dev>",
        to: "sahatanmay108@gmail.com",
        subject: "Welcome to Chatify",
        html: emailTemplate(name, clientURL)
    })

    if (error) {
        console.error("Error in sending welcome email", error)
        throw new Error("Failed to send welcome email")
    }

    console.log("Welcome email sent successfully", data)
}