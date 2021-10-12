import { Node } from "./Node";

import {
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
} from "@ory/kratos-client";
import { Messages } from "./Messages";

export interface Props {
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow
    | SelfServiceRecoveryFlow;
  only?:
    | "oidc"
    | "password"
    | "profile"
    | "totp"
    | "webauthn"
    | "link"
    | "lookup_secret";
}

export const Flow = ({ flow, only }: Props) => {
  if (!flow) {
    // No flow was set yet? It's probably still loading...
    return null;
  }

  const nodes = only
    ? flow.ui.nodes.filter(({ group }) => group === "default" || group === only)
    : flow.ui.nodes;

  if (nodes.length === 1) {
    return null;
  }
  console.log(flow.ui);
  return (
    <>
      <Messages messages={flow.ui.messages} />
      {nodes.map((node, index) => (
        <Node key={index} node={node} />
      ))}
    </>
  );
};
