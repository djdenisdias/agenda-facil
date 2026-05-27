import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1>DASHBOARD!</h1>
      <Card className="w-[250px]">
        <CardContent>
          {session?.user.image && (
            // <Image src={session?.user.image} alt={"Imagem do usuário"} />
            <p>{session?.user.image}</p>
          )}
          <p>Nome: {session?.user.name}</p>
          <p>E-mail: {session?.user.email}</p>
        </CardContent>
        <CardFooter>
          <SignOutButton className="w-full" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardPage;
