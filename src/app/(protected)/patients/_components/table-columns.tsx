"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { patientsTable } from "@/db/schema";

import PatientsTableActions from "./table-actions";

export const patientsTableColumns: ColumnDef<
  typeof patientsTable.$inferSelect
>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (params) => {
      const patient = params.row.original;
      const phoneNumber = patient.phoneNumber;
      if (!phoneNumber) return "";
      const formated = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      );
      return formated;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;

      return patient.sex === "male" ? (
        <Badge variant="outline">Masculino</Badge>
      ) : (
        <Badge variant="outline">Feminino</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];
