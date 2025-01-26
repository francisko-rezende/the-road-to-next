import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/sign-up-form";
import { signInPath } from "@/paths";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign up"
        description="Create an account to get started"
        className="w-full max-w-[420px] animate-fade-in-from-top self-center"
        content={<SignUpForm />}
        footer={
          <Link href={signInPath()} className="text-sm text-muted-foreground">
            Have an account? Sign in now.
          </Link>
        }
      />
    </div>
  );
}
