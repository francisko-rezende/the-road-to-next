import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form/sign-in-form";

const SignInPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign in"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-in-from-top self-center"
        content={<SignInForm />}
        // footer={
        //   <Link href={signInPath()} className="text-sm text-muted-foreground">
        //     Have an account? Sign in now.
        //   </Link>
        // }
      />
    </div>
  );
};

export default SignInPage;
