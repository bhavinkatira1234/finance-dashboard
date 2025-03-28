import { SignUpForm } from "@/components/auth/signUpForm";

export default async function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-muted-foreground">Sign up to start tracking your finances</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
