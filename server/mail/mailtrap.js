import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

export const client = new MailtrapClient({
  token: process.env.MAIL_TRAP_API_TOKEN,
});
console.log("Mailtrap Token:", process.env.MAIL_TRAP_API_TOKEN);


export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

