import { LucideLoaderCircle } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = ComponentProps<"button">;

export const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
};
