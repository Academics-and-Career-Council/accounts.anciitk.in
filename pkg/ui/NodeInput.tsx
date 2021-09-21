import { UiNode, UiNodeInputAttributes } from '@ory/kratos-client'
import { useEffect, useState } from 'react'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link'

interface Props {
  node: UiNode
  attributes: UiNodeInputAttributes
}

export const NodeInput = ({ node, attributes }: Props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(attributes.value)
  }, [attributes.value])

  const onClick = () => {
    if (attributes.onclick as any) {
      eval(attributes.onclick as any)
    }
  }

  switch (attributes.type) {
    case 'text' :
      return (
        <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
            value={attributes.value}
            />
          </Form.Item>
      )

    case 'password' :
      return(
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
              value={attributes.value}
            />
          </Form.Item>
      )

    case 'submit':
      return (
        <>
        <Form.Item>
        <a 
        // className={styles.forgot} 
        href="/forgotpassword">
          Forgot password
        </a>
      </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" 
            // className={styles.button}
            onClick = {onClick}
            >
              Log in
            </Button>
            Don't have an account? <Link href="/signup">SignUp Here!</Link>
          </Form.Item>
          </>
      )
   
  }

  return(
    <>
    </>
  )

  // return (
  //   <TextInput
  //     title={node.meta.label?.text}
  //     // onClick={onClick}
  //     onChange={(e) => {
  //       setValue(e.target.value)
  //     }}
  //     type={attributes.type}
  //     name={attributes.name}
  //     value={value}
  //     disabled={attributes.disabled}
  //     help={node.messages.length > 0}
  //     state={
  //       node.messages.find(({ type }) => type === 'error') ? 'error' : undefined
  //     }
  //     subtitle={node.messages.map(({ text }) => text).join('\n')}
  //   />
  // )
}
