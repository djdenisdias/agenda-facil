import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
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
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";
import { appointmentsTableColumns } from "./_components/table-columns";

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinicId) {
    redirect("/clinic-form");
  }

  const [doctors, patients] = await Promise.all([
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinicId.id),
    }),
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinicId.id),
    }),
  ]);

  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, session.user.clinicId.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Agendamentos</PageHeaderTitle>
          <PageHeaderDescription>
            Acesse uma visão geral detalhada dos agendamentos
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageHeaderActions>
      </PageHeader>
      <PageContent>
        {appointments.length === 0 ? (
          <div className="mt-50 flex flex-col items-center justify-center">
            <h1>Nenhum agendamento cadastrado ainda</h1>
            <Image
              src="/empty.png"
              width={96}
              height={96}
              alt="Nenhum médico cadastrado ainda"
            ></Image>
          </div>
        ) : (
          <DataTable
            data={appointments}
            columns={appointmentsTableColumns}
          ></DataTable>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default AppointmentsPage;
