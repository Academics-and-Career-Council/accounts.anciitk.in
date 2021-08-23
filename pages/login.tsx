import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import Link from 'next/link'

function login(){
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Sign in to your account</h2>
        <main className={styles.form_login}>
        <Form>
          
        <Image src="/download.png" width=
        {90} height={90}/>
          <Form.Item
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
          </Form.Item>

          <Form.Item>
        <a className={styles.forgot} href="">
          Forgot password
        </a>
      </Form.Item>




          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Sign in
            </Button>
            Don't have an account? <Link href="/signup">SignUp Here!</Link>
          </Form.Item>
        </Form>
        </main>
        </div>
      );
}

export default login


