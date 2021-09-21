import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SelfServiceRegistrationFlow } from '@ory/kratos-client'
import { CardTitle } from '@ory/themes'
import { Flow } from '../pkg/ui/Flow'
import { ActionCard, CenterLink, MarginCard } from '../pkg/styled'

// Or if you use the open source:
//
// import {ory} from "../../pkg/open-source";
import { ory } from '../pkg/open-source'
import { AxiosError } from 'axios'
import Head from 'next/head'

const Registration: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()

  // Get ?flow=... from the URL
  const router = useRouter()
  const { flow: flowId } = router.query

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data)
        })
        .catch((err: AxiosError) => {
          switch (err.response?.status) {
            case 410:
            // Status code 410 means the request has expired - so let's load a fresh flow!
            case 403:
              // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
              return router.push('/registration')
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
      .initializeSelfServiceRegistrationFlowForBrowsers()
      .then(({ data }) => {
        setFlow(data)
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
      <Head>
        <title>Create account - Ory NextJS Integration Example</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
      <MarginCard>
        <CardTitle>Create account</CardTitle>
        <Flow flow={flow} />
      </MarginCard>
      <ActionCard>
        <CenterLink href="/login">Sign in</CenterLink>
      </ActionCard>
    </>
  )
}

export default Registration
