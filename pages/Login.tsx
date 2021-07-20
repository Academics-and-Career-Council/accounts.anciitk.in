import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import "../styles/login.css";

import { SESSION_STATE } from "../store";
import logo from "../assets/img/logo192.png";

const Login = (props: any) => {
  const setActive = useSetRecoilState(SESSION_STATE);

  const submitHandler = (values: any) => {
    setActive((curr) => ({ role: curr.role, active: true }));
    console.log(values);
    props.history.push("/");
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
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
          <Form method="POST" onFinish={submitHandler}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Registered Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Row justify='space-between'>
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Link to="/reset">Forgot password?</Link>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
              or <Link to="/register">Register Now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Login;
