"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment || !isOwner({ authUser: user, entity: comment })) {
    return toActionState({ message: "Not authorized", status: "ERROR" });
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState({ error });
  }

  revalidatePath(comment.id);
  return toActionState({ message: "Comment deleted", status: "SUCCESS" });
};
