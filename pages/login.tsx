import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import Link from 'next/link'

function login(){
    return (
        <div className={styles.container}>
            
        
        <main className={styles.form_login}>
        <Form>
          <h1>LogIn here!</h1>
        <Image src="/download.png" width=
        {50} height={50}/>
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
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
            Or <Link href="/sighup">SignUp Here!</Link>
          </Form.Item>
        </Form>
        </main>
        </div>
      );
}

export default login


