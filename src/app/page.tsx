import { LoginForm } from "@/components/auth/loginForm";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Personal Finance Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Track your income, expenses, and savings goals</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
