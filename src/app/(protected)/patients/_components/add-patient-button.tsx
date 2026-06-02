"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertPatientForm from "./upsert-patient-form";

const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="bg-primary flex gap-2 rounded-lg p-1 pr-2 text-white">
          <Plus />
          Adicionar paciente
        </div>
      </DialogTrigger>
      <UpsertPatientForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddPatientButton;
