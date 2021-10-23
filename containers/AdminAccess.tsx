import React from "react";
import { secured } from "react-abac";
import Link from "next/link";
import { permissions } from "../pkg/abac";
import { SolutionOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { isBrowser, isMobile } from "react-device-detect";
import styles from "../styles/SignupStyles.module.scss"

const AdminAccess = () => {

  if(isBrowser)
  return (
    <Menu theme='dark'  mode="inline">
    <Menu.Item key="6" icon={<SolutionOutlined />} >
    <Link href="https://admin.anciitk.in">Admin</Link>
  </Menu.Item>
  </Menu>
  )
  else if (isMobile) {
    return (
      
    <Menu theme='dark'>
    <Menu.Item key="6" 
      icon={<SolutionOutlined style={{fontSize:'20px'}} />} 
      style={{paddingLeft: "25px",}}
      className={styles.phoneMenuProfile}>
    <Link href="https://admin.anciitk.in">Admin</Link>
  </Menu.Item>
  </Menu>
    )
  }
  else {
    return(<div />)
  }
};

export default secured({
  permissions: permissions.VIEW_BUTTON,
  mapPropsToData: (props) => props,
  noAccess: () => <div />,
})(AdminAccess);
