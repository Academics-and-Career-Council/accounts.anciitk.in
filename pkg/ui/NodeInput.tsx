import { UiNode, UiNodeInputAttributes } from "@ory/kratos-client";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import { getLabel } from "./Node";

interface Props {
  node: UiNode;
  attributes: UiNodeInputAttributes;
}

export const NodeInput = ({ node, attributes }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(attributes.value);
  }, [attributes.value]);

  const onClick = (attributes: any) => {
    if (attributes.onclick as any) {
      eval(attributes.onclick as any);
    }
  };
  const placeholder = (str: string) => {
    if (str === "ID") return "IITK mail ID";
    else return "Password";
  };

  const prefix = (str: string) => {
    if (str === "ID") return <UserOutlined className="site-form-item-icon" />;
    else return <LockOutlined className="site-form-item-icon" />;
  };

  switch (attributes.type) {
    case "hidden":
      return (
        <input
          type={attributes.type}
          name={attributes.name}
          value={attributes.value}
        />
      );

    case "submit":
      return (
        <>
          <Form.Item>
            <a className={styles.forgot} href="/forgotpassword">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.button}
              name={attributes.name}
              value={attributes.value}
              onClick={onClick}
            >
              Log in
            </Button>
            Don't have an account?{" "}
            <Link href="/registration">SignUp Here!</Link>
          </Form.Item>
        </>
      );
  }

  return (
    <Form.Item
      rules={[
        {
          required: true,
          message: `Please input your ${getLabel(node)} !`,
        },
      ]}
    >
      <Input
        prefix={prefix(getLabel(node))}
        onClick={onClick}
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder(getLabel(node))}
        type={attributes.type}
        name={attributes.name}
        value={value}
      />
    </Form.Item>
  );
};
