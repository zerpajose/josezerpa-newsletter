import express, { Request, Response } from "express";
import cors from "cors";
import { createContact } from "./controllers/create-contact.js";
import { deleteContact } from "./controllers/delete-contact.js";
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

app.delete('/contact/unsubscribe/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    await deleteContact(email);
    res.status(204).send();
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error });
  }
});

export default app;
