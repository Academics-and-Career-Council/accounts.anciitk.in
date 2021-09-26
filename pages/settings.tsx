import styles from "../styles/SignupStyles.module.scss"
import 'antd/dist/antd.css';
import { LockOutlined } from '@ant-design/icons';
import { Input } from "antd";
import Image from "next/dist/client/image";

import PasswordStrengthBar from 'react-password-strength-bar';
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SelfServiceSettingsFlow } from '@ory/kratos-client'
import { AxiosError } from 'axios'
import Link from 'next/link'
import Head from 'next/head'


// Or if you use the open source:
//
import { ory } from '../pkg/open-source'

const Messages = ({ messages }: any) => {
    if (!messages) {
      // No messages? Do nothing.
      return null
    }
  
    return (
      
        <div style={{color: "green", fontSize: "14px"}}>{messages[0].text}</div>
    )
  }

const Flow = ({ flow, only }:any) => {
  const [value, setValue] = useState('')

  if (!flow) {
    // No flow was set yet? It's probably still loading...
    return null
  }
  const nodes = only
    ? flow.ui.nodes.filter(({ group }:any) => group === 'default' || group === only)
    : flow.ui.nodes


  if (nodes.length === 1) {
    return null
  }
  const onClick = (attributes:any) => {
    if (attributes.onclick as any) {
      eval(attributes.onclick as any)
    }
  }

  return (
    <form action={flow.ui.action} method={flow.ui.method}>
          <Messages 
            messages={flow.ui.messages} 
          />
      <input
          type={nodes[0].attributes.type}
          name={nodes[0].attributes.name}
          value={nodes[0].attributes.value}
        />
    <Input.Password
      title={nodes[1].meta.label?.text}
      onClick={() => {onClick(nodes[1].attributes)}}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      type={nodes[1].attributes.type}
      name={nodes[1].attributes.name}
      value={value}
      disabled={nodes[1].attributes.disabled}
      
    >
    </Input.Password>
    <PasswordStrengthBar password={value} />
    <div className={styles.redMsg}>
        <div style={{fontSize: '12px'}}>
        {nodes[1].messages.map(({ text }:any) => text).join('\n')}
        </div>
    </div>
    <br />
        <button
            className={styles.buttonStyleRegistration}
            style={{backgroundColor: "#1890ff",color:'white',}}
            type="submit"
            name={nodes[2].attributes.name}
            onClick={() => {onClick(nodes[2].attributes)}}
            value={nodes[2].attributes.value}
            disabled={nodes[2].attributes.disabled}
        >
            Save
          </button>
      
    </form>
  )
}

const Settings: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>()

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
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }) => {
          setFlow(data as any)
        })
        .catch((err: AxiosError) => {
          switch (err.response?.status) {
            case 410:
            // Status code 410 means the request has expired - so let's load a fresh flow!
            case 403:
              // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
              return router.push('/settings')
          }

          throw err
        })
      return
    }

    // Otherwise we initialize it
    ory.initializeSelfServiceSettingsFlowForBrowsers().then(({ data }) => {
      setFlow(data as any)
    })
  }, [flowId, router.isReady])

  return (
    <>
      <Head>
        <title>Change Password</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
             <div className={styles.bgWrap}>
                 <Image
                     alt="IITK background"
                     src="/IITKBGsignupPage.jpg"
                     layout="fill"
                     objectFit="cover"
                     quality={100}
                 />
             </div>
             <div className={styles.container}>
             <div className={styles.form_changePass}>
             <LockOutlined style={{ fontSize: '65px', padding: '20px'}}/>
                     <h1 style={{padding: '10px'}}> Change Password </h1>
        <Flow only="password" flow={flow} />
     
        
            <Link href="/" >
            <button 
                className={styles.buttonStyleRegistration}
                style={{backgroundColor: 'white'}}
            >
                Home
            </button>
            </Link>
        
     
      </div>
      </div>
    </>
  )
}

export default Settings