"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

export const RedirectToast = () => {
  useEffect(() => {
    const triggerToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    };

    triggerToast();
  }, []);

  return null;
};
