"use client";

import { Edit } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpnen, SetIsUpsertPatientDialogOpnen] =
    useState(false);
  const initials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant={"outline"}>{patient.email}</Badge>
        <Badge variant={"outline"}>{patient.phoneNumber}</Badge>
        <Badge variant={"outline"}>{patient.sex}</Badge>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Dialog
          open={isUpsertPatientDialogOpnen}
          onOpenChange={SetIsUpsertPatientDialogOpnen}
        >
          <DialogTrigger className="w-full">
            <div className="bg-primary flex items-center justify-center gap-2 rounded-lg p-1 pr-2 pl-2 text-white">
              <Edit size={18} />
              Ver detalhes
            </div>
          </DialogTrigger>
          <UpsertPatientForm
            patient={{
              ...patient,
            }}
            onSuccess={() => SetIsUpsertPatientDialogOpnen(false)}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
