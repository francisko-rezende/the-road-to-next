"use client";

import { LucideLoaderCircle } from "lucide-react";
import { ComponentProps, ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = ComponentProps<"button"> & {
  icon?: ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export const SubmitButton = ({ icon, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const shouldRenderIcon = !!icon && !pending;

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {props.children}
      {shouldRenderIcon && icon}
    </Button>
  );
};
