"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Não autorizado");
    }
    if (!session?.user.clinicId?.id) {
      throw new Error("Clínica não encontrada");
    }

    const doctorValues = {
      name: parsedInput.name,
      specialty: parsedInput.specialty,
      appointmentPriceInCents: parsedInput.appointmentPriceInCents,
      availableFromWeekDay: parsedInput.availableFromWeekDay,
      availableToWeekDay: parsedInput.availableToWeekDay,
      availableFromTime: parsedInput.availableFromTime,
      availableToTime: parsedInput.availableToTime,
      clinicId: session.user.clinicId.id,
    };

    await db
      .insert(doctorsTable)
      .values({
        id: parsedInput.id,
        ...doctorValues,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: doctorValues,
      });

    revalidatePath("/doctors");
  });

// redirect("/dashboard");
