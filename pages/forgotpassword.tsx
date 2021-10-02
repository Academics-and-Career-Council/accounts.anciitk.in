import { Form, Input, Button, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { xenon } from 'pkg/xenon';

function forgot_pass(){
  const[submitDisabled, setSubmitDisabled] = useState(false);
  // const [formdata, setformdata] = useState({
  //   email:''
  // });

  const onFinish = async(values:any) => {
    setSubmitDisabled(true);
    const loginFormData = new FormData();
    loginFormData.append("email", values.email);

    // try {
    //   // make axios post request
    //   const response = await axios.post(`${process.env.NEXT_PUBLIC_XENON_URL}/recover`,loginFormData);
    // } catch(error) {
    //   console.log(error)
    // }
    xenon
       .recover(values.email)
      .then((data) => {
        message.success("Account Registered");
        setSubmitDisabled(false);
        //console.log('account recovered')
      })
      .catch((err) => {
        message.error(err.message);
        setSubmitDisabled(false);
      })
  }
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Forgot Password?</h2>
        <main className={styles.form_login}>
        <Form onFinish={onFinish}>
          
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
            <Button disabled={submitDisabled} type="primary" htmlType="submit" className={styles.button}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        </main>
        </div>
      );
}

export default forgot_pass