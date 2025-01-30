import { User as AuthUser } from "lucia";

type Entity = {
  userId: string | null;
};

type IsOwnerArgs = {
  authUser: AuthUser | null | undefined;
  entity: Entity | null | undefined;
};
export const isOwner = ({ authUser, entity }: IsOwnerArgs) => {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (entity.userId === authUser.id) {
    return true;
  }

  return false;
};
