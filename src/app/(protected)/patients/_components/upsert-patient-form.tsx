"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { upsertPatient } from "@/actions/upsert-patient";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsTable } from "@/db/schema";

const formSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.email().trim().min(1, {
    message: "E-mail é obrigatório",
  }),
  phoneNumber: z.string().min(1, {
    message: "Telefone é obrigatório",
  }),
  sex: z.enum(["male", "female"], { message: "Sexo é obrigatório" }),
});

interface UpsertPatientFormProps {
  patient?: typeof patientsTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertPatientForm = ({ patient, onSuccess }: UpsertPatientFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patient?.name || "",
      email: patient?.email || "",
      phoneNumber: patient?.phoneNumber || "",
      sex: (patient?.sex as "male" | "female") || undefined,
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        name: patient?.name || "",
        email: patient?.email || "",
        phoneNumber: patient?.phoneNumber || "",
        sex: patient?.sex || undefined,
      });
    }
  }, [patient, form]);

  const upsertPatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente adicionado com sucesso! 😁");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao adicionar paciente 😔");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertPatientAction.execute({
      id: patient?.id,
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      sex: values.sex,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{patient ? "Editar" : "Adicionar"} paciente</DialogTitle>
        <DialogDescription>
          {patient
            ? "Edite as informações do paciente"
            : "Adicione um novo paciente"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nome do paciente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="E-mail do paciente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value.value);
                    }}
                    customInput={Input}
                    placeholder="Telefone do paciente"
                  ></PatternFormat>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={upsertPatientAction.isPending}>
              {upsertPatientAction.isPending && patient
                ? "Atualizando.."
                : patient
                  ? "Atualizar"
                  : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertPatientForm;
