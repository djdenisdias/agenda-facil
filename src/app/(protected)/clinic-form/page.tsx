import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ClinicForm from "./_components/form";

const ClinicFormPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Adicionar clínica</CardTitle>
          <CardDescription>Adicione uma clínica para continuar</CardDescription>
        </CardHeader>
        <ClinicForm />
      </Card>
    </div>
  );
};

export default ClinicFormPage;
