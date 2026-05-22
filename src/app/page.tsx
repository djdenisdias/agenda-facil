import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 font-bold">
        <h1>Oi</h1>
        <p>Tudo bem?</p>
        <Button>Botão</Button>
      </div>
      <div className="dark flex flex-col gap-2 font-bold">
        <h1>Oi</h1>
        <p>Tudo bem?</p>
        <Button>Botão</Button>
      </div>
    </>
  );
}
