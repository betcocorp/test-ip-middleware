import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="max-w-7xl mx-auto p-24">
      <div>
        <h1 className="text-5xl font-bold text-center">Betco News</h1>
      </div>
    </main>
  );
}
