import { Role } from "@anciitk/xenon-js";
import { Rules } from "react-abac";

interface User {
  uuid: string;
  roles: Role[];
  permissions: permissions[];
}
export enum permissions  {
    VIEW_BUTTON= "VIEW_BUTTON",
}
export const rules: Rules<Role, permissions, User> = {
    [Role.Admin]: {
      [permissions.VIEW_BUTTON]: true
    },
    [Role.Manager]: {
      [permissions.VIEW_BUTTON]: true
    },
    [Role.Secretary]: {
      [permissions.VIEW_BUTTON]: true
    },
    [Role.Student]: {
      [permissions.VIEW_BUTTON]: true
    }
  };