"use client";
import { CalendarIcon, ClockIcon } from "lucide-react";
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
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvailability } from "../helpers/availability";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isUpsertDoctorDialogOpnen, SetIsUpsertDoctorDialogOpnen] =
    useState(false);
  const initials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const availability = getAvailability(doctor);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant={"outline"}>
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd").split("-")[0]} a{" "}
          {availability.to.format("dddd").split("-")[0]}
        </Badge>
        <Badge variant={"outline"}>
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} -{" "}
          {availability.to.format("HH:mm")}
        </Badge>
        <Badge variant={"outline"}>
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertDoctorDialogOpnen}
          onOpenChange={SetIsUpsertDoctorDialogOpnen}
        >
          <DialogTrigger>
            <div className="bg-primary flex gap-2 rounded-lg p-1 pr-2 pl-2 text-white">
              Ver detalhe
            </div>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
            onSuccess={() => SetIsUpsertDoctorDialogOpnen(false)}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
