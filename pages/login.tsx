import { Form} from 'antd';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SelfServiceLoginFlow} from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { ory } from '../pkg/open-source'
import { Flow } from '../pkg/ui/Flow'


function login() {

  const [flow, setFlow] = useState<SelfServiceLoginFlow>()

  // Get ?flow=... from the URL
  const router = useRouter()
  const { flow: flowId, return_to: return_to } = router.query

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data as any)
        })
        .catch((err: AxiosError) => {
          switch (err.response?.status) {
            case 410:
            // Status code 410 means the request has expired - so let's load a fresh flow!
            case 403:
              // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
              return router.push('/login')
            case 400:
              // Status code 400 implies the user is already signed in
              return router.push('/')
          }

          throw err
        })
      return
    }

    // Otherwise we initialize it
    ory
    .initializeSelfServiceLoginFlowForBrowsers(undefined, {
      params: return_to
        ? {
            return_to: return_to
          }
        : {}
    })
      .then(({ data }) => {
        setFlow(data as any)
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 400:
            // Status code 400 implies the user is already signed in
            return router.push('/')
        }

        throw err
      })
  }, [flowId, router.isReady])


  return (
    <>
    <title>Login</title>
    <div className={styles.container}>
      <h2 className={styles.heading}>Sign in to your account</h2>
      <main className={styles.form_login}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <form
            action={flow?.ui.action}
            method={flow?.ui.method}>

            <Image src='/anc-logo.png' width=
              {90} height={90} />

            <Flow flow={flow} />
          </form>
        </Form>
      </main>
    </div>
    </>
  );
}

export default login


