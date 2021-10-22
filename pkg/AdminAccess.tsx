import React from "react";
import { secured } from "react-abac";
import Link from "next/link";
import { permissions } from "../services/abac";
import { SolutionOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const AdminAccess = (collapse:any) => {

  return (
    <Menu theme='dark'  mode="inline">
    <Menu.Item key="6" icon={<SolutionOutlined />} >
    <Link href="https://admin.anciitk.in">Admin</Link>
  </Menu.Item>
  </Menu>
  );
};

export default secured({
  permissions: permissions.VIEW_BUTTON,
  mapPropsToData: (props) => props,
  noAccess: () => <div />,
})(AdminAccess);
