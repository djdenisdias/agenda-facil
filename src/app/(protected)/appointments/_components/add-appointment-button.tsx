"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const AddAppointmentButton = ({
  patients,
  doctors,
}: AddAppointmentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="bg-primary flex gap-2 rounded-lg p-1 pr-2 text-white">
          <Plus />
          Adicionar agendamento
        </div>
      </DialogTrigger>
      <UpsertAppointmentForm
        doctors={doctors}
        patients={patients}
        onSuccess={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Dialog>
  );
};

export default AddAppointmentButton;
