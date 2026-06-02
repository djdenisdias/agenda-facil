"use client";
import { CalendarIcon, ClockIcon, Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

// import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  // const deletePatientAction = useAction(deletePatient, {
  //   onSuccess: () => {
  //     toast.warning("Paciente deletado com sucesso! 😐");
  //   },
  //   onError: () => {
  //     toast.error("Erro ao deletar paciente 😮");
  //   },
  // });

  // const handleDeletePatientClick = () => {
  //   if (!patient) {
  //     return;
  //   }

  //   deletePatientAction.execute({ id: patient.id });
  // };

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
        {/* <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <Button variant="destructive" type="button" className="w-full">
              <Trash size={16} />
              Excluir paciente
            </Button>
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que quer excluir o paciente{" "}
                <span className="font-extrabold">{patient.name}</span>?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Ao excluir um paciente, todas as consultas atreladas a ele também
                serão excluídas!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePatientClick}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
