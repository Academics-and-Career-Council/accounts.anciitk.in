import { atom } from "recoil";
import { SessionState } from "@anciitk/kratos-verify-session";
import { Session } from "@ory/kratos-client";

export const recoilSessionState = atom<SessionState|undefined>({
    key: 'session-state',
    default: undefined,
})