import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/data-table";
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

import PatientCard from "../patients/_components/patient-card";
import AddPatientButton from "./_components/add-patient-button";
import { patientsTableColumns } from "./_components/table-columns";

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
          <DataTable data={patients} columns={patientsTableColumns}></DataTable>

          // <div className="grid grid-cols-3 gap-6">
          //   {patients.map((patient) => (
          //     <PatientCard key={patient.id} patient={patient} />
          //   ))}
          // </div>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
