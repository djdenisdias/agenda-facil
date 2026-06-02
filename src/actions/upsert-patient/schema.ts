import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.email({ message: "E-mail inválido" }).trim().min(1, {
    message: "E-mail é obrigatório",
  }),
  phoneNumber: z.string().trim().min(1, {
    message: "Telefone é obrigatório",
  }),
  sex: z.enum(["male", "female"], { message: "Sexo é obrigatório" }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
