import { eq } from "drizzle-orm";
import { Share2 } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddPatientButton from "./_components/add-patient-button";

// import AddDoctorButton from "./_components/add-doctor-button";
// import DoctorCard from "./_components/doctor-card";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinicId) {
    redirect("/clinic-form");
  }

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinicId.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Pacientes</PageHeaderTitle>
          <PageHeaderDescription>
            Acesse uma visão geral detalhada dos pacientes
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <AddPatientButton />
        </PageHeaderActions>
      </PageHeader>
      <PageContent>
        {patients.length === 0 ? (
          <div className="mt-50 flex flex-col items-center justify-center">
            <h1>Nenhum paciente cadastrado ainda</h1>
            <Image
              src="/empty.png"
              width={96}
              height={96}
              alt="Nenhum médico cadastrado ainda"
            ></Image>
          </div>
        ) : (
          <table className="w-full">
            <th className="flex w-full justify-between text-left">
              <td className="text-left">NOME</td>
              <td className="text-left">E-MAIL</td>
              <td className="text-left">NÚMERO DE CELULAR</td>
              <td className="text-left">SEXO</td>
              <td></td>
            </th>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="flex w-full justify-between text-left"
              >
                <td className="text-left">{patient.name}</td>
                <td className="text-left">{patient.email}</td>
                <td className="text-left">{patient.phoneNumber}</td>
                <td className="text-left">{patient.sex}</td>
                <td>
                  <Share2 />
                </td>
              </tr>
            ))}
          </table>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
