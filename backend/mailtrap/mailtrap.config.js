import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
}); // Initialize the Mailtrap client with the token from environment variables

export const sender = {
  email: "hello@demomailtrap.co",
  name: "sahil",
}; // Define the sender's email and name

