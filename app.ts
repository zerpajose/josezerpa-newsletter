import express, { Request, Response } from "express";
import cors from "cors";
import { createContact } from "./controllers/create-contact.js";
import { unsubscribeContact } from "./controllers/unsubscribe-contact.js";
import { CreateContactInputSchema } from "./validations/schemas.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post('/contact', async (req: Request, res: Response) => {
  try {
    const contactData = CreateContactInputSchema.parse(req.body);
    await createContact(contactData);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error });
  }
});

app.patch('/contact/unsubscribe/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    await unsubscribeContact(email);
    res.status(204).json({ message: "Contact unsubscribed successfully" });
  } catch (err) {
    const error = err as Error;
    console.error({ error });
    res.status(400).json({ error });
  }
});

export default app;
