import { auth } from "@/auth";
import { SignIn } from "./components/SignIn";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <main className="max-w-7xl mx-auto p-24">
        <div>
         <SignIn />
        </div>
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto p-24">
      <div>
        <h1 className="text-5xl font-bold text-center">Betco News</h1>
      </div>
    </main>
  );
}
