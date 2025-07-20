import * as z from "zod/v4"; 

export const CreateContactInputSchema = z.object({
  name: z.string().max(50, "Nombre debe tener menos de 50 caracteres"),
  email: z.email("Email no es válido"),
  familyName: z.string().max(50, "Apellido debe tener menos de 50 caracteres"),
  unsubscribed: z.boolean().optional(),
});
