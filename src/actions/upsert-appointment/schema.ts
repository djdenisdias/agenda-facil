import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().min(1, {
    message: "Paciente é obrigatório",
  }),
  doctorId: z.string().min(1, {
    message: "Médico é obrigatório",
  }),
  appointmentPrice: z.number().min(1, {
    message: "Valor da consulta é obrigatório",
  }),
  data: z.date({
    message: "Data da consulta é obrigatória",
  }),
  time: z.string().min(1, {
    message: "Horário da consulta é obrigatório",
  }),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
