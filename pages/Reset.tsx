import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import {Helmet} from 'react-helmet'
import logo from "../assets/img/logo192.png";
import "../styles/login.css";

const Login: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Reset Password</title>
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
          <Form method="POST">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Registered Email" />
            </Form.Item>
            <Form.Item
              name="confirmEmail"
              rules={[
                { required: true, message: "Please input your email again" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Confirm Email" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Reset Password
              </Button>
              <Row justify='space-between'>
                <Col><Link to="/register">Register</Link></Col>
                <Col><Link to='/login'>Remember your password?</Link></Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Login;
