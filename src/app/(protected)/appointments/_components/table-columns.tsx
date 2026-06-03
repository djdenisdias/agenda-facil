"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { appointmentsTable } from "@/db/schema";

import PatientsTableActions from "./table-actions";

export const appointmentsTableColumns: ColumnDef<
  typeof appointmentsTable.$inferSelect
>[] = [
  {
    id: "patient",
    accessorKey: "patient",
    header: "Paciente",
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data",
  },
  {
    id: "doctor",
    accessorKey: "doctor",
    header: "Médico",
    // cell: (params) => {
    //   const patient = params.row.original;
    //   const phoneNumber = patient.phoneNumber;
    //   if (!phoneNumber) return "";
    //   const formated = phoneNumber.replace(
    //     /(\d{2})(\d{5})(\d{4})/,
    //     "($1) $2-$3",
    //   );
    //   return formated;
    // },
  },
  {
    id: "specialty",
    accessorKey: "specialty",
    header: "Especialidade",
    // cell: (params) => {
    //   const patient = params.row.original;

    //   return patient.sex === "male" ? (
    //     <Badge variant="outline">Masculino</Badge>
    //   ) : (
    //     <Badge variant="outline">Feminino</Badge>
    //   );
    // },
  },
  {
    id: "value",
    accessorKey: "value",
    header: "Valor",
    // cell: (params) => {
    //   const patient = params.row.original;

    //   return patient.sex === "male" ? (
    //     <Badge variant="outline">Masculino</Badge>
    //   ) : (
    //     <Badge variant="outline">Feminino</Badge>
    //   );
    // },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    // cell: (params) => {
    //   const patient = params.row.original;

    //   return patient.sex === "male" ? (
    //     <Badge variant="outline">Masculino</Badge>
    //   ) : (
    //     <Badge variant="outline">Feminino</Badge>
    //   );
    // },
  },
  {
    id: "actions",
    // cell: (params) => {
    //   const patient = params.row.original;
    //   return <PatientsTableActions patient={patient} />;
    // },
  },
];
