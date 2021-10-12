import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SelfServiceError } from "@ory/kratos-client";
import { CardTitle } from "@ory/themes";
import { AxiosError } from "axios";

import Link from "next/link";

// Or if you use the open source:
//
// import {ory} from "../../pkg/open-source";
import { ory } from "../pkg/open-source";

const Login: NextPage = () => {
  const [error, setError] = useState<SelfServiceError | string>();

  // Get ?id=... from the URL
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    ory
      .getSelfServiceError(String(id))
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          case 403:
          case 410:
            return router.push("/");
        }

        return Promise.reject(err);
      });
  }, [id, router.isReady]);

  if (!error) {
    return null;
  }

  return (
    <>
      <div>
        <CardTitle>An error occurred</CardTitle>
        <code />
      </div>
      <div> {JSON.stringify(error, null, 2)}</div>
      <div>
        <Link href="/" passHref>
          <div>Go back</div>
        </Link>
      </div>
    </>
  );
};

export default Login;
