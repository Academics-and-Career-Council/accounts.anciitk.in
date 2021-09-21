import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SelfServiceLoginFlow, UiNodeAttributes,UiNodeInputAttributes,SubmitSelfServiceLoginFlowBody} from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { ory } from '../pkg/open-source'
import { Flow } from '../pkg/ui/Flow'

// interface Props {
//   node: UiNode
//   attributes: UiNodeInputAttributes
// }

function login(){

  const [flow, setFlow] = useState<SelfServiceLoginFlow>()

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
      .initializeSelfServiceLoginFlowForBrowsers()
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


    const nodes = flow?.ui.nodes

    // const onFinish = (values: SubmitSelfServiceLoginFlowBody) =>
    // router
    //   .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
    //   .then(() => {
    //     ory
    //       .submitSelfServiceLoginFlow(String(flow?.id), undefined, values)
    //       .then(() => {
    //         // We logged in successfully! Let's bring the user profile.
    //         return router.push('/profile').then(() => {})
    //       })
    //       .catch((err: AxiosError) => {
    //         switch (err.response?.status) {
    //           case 400:
    //             // Status code 400 implies the form validation had an error
    //             setFlow(err.response?.data)
    //             return
    //         }

    //         throw err
    //       })
    //   })

    const onFinish = (values :SubmitSelfServiceLoginFlowBody) => {
      console.log(values)


    //  let xhr = new XMLHttpRequest();
    //  xhr.open('POST', `http://localhost:4433/self-service/login?flow=${flow?.id}`)
     
    //  xhr.send()
    //  xhr.onload = () => {
    //   if (xhr.status != 200) {
    //     alert(`Error ${xhr.status}: ${xhr.statusText}`)
    //   } 
      
    //   else { 
    //     nodes?.map((node) => {
    //       console.log(node.attributes)
    //     })
    //   }

    //  }
     
    // xhr.onerror = function() {
    //   alert("Request failed")
    // }

    ory
      .submitSelfServiceLoginFlow(String(flow?.id), values)
      .then(() => {
        router.push(`/login?flow=${flow?.id}`)
      })
      .catch((err: AxiosError) => {
                switch (err.response?.status) {
                  case 400:
                    setFlow(err.response?.data)
                    return
                }
    
                throw err
          })
    }
    

    

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Sign in to your account</h2>
        <main className={styles.form_login}>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        action={flow?.ui.action}
        method={flow?.ui.method}
        onFinish={onFinish}
        >
          
        <Image src='/anc-logo.png' width=
        {90} height={90}/>

        <Flow flow = {flow}/>


          {/* <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item> */}

          {/* <Form.Item>
        <a className={styles.forgot} href="/forgotpassword">
          Forgot password
        </a>
      </Form.Item> */}




          {/* <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Sign in
            </Button>
            Don't have an account? <Link href="/signup">SignUp Here!</Link>
          </Form.Item> */}
        </Form>
        </main>
        </div>
      );
}

export default login


