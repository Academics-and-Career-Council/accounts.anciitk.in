import React from "react";
import {Link, RouteComponentProps} from 'react-router-dom'
import { Row, Col, Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import logo from "../assets/img/logo192.png";
import "../styles/login.css";

const Login = (props: RouteComponentProps) => {
  
  const onSubmit = (values: any) => {
    console.log(values);
    props.history.push('/login')
  }
  
  return (
    <React.Fragment>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Row align="middle" justify="center">
        <Col span={18}>
          <div className="header">
            <img
              src={logo}
              alt="anc logo"
              style={{ height: "60px", width: "60px" }}
            />
            <h4>Careers Portal</h4>
          </div>
        </Col>
        <Col span={8}>
          <Form method="POST" onFinish={onSubmit}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="IITK Email" type='email' />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Set Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your password again" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Create Account
              </Button>
              <Link to="/login">Already registered?</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Login;
