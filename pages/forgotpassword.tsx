import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import Link from 'next/link'

function forgot_pass(){
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Forgot Password?</h2>
        <main className={styles.form_login}>
        <Form>
          
        <Image src="/forgotpass.png" width=
        {50} height={50}/>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type='email' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
             <Link href="#"> Reset Password </Link>
            </Button>
          </Form.Item>
        </Form>
        </main>
        </div>
      );
}

export default forgot_pass