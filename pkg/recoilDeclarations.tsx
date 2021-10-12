import { atom } from "recoil";
import { SessionState } from "@anciitk/kratos-verify-session";

export const recoilSessionState = atom<SessionState | undefined>({
  key: "session-state",
  default: undefined,
});
