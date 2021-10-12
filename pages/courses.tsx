import React from "react";

import styles from "../styles/comingsoon.module.css";
import {SettingOutlined} from '@ant-design/icons'
import { Button } from "antd";
export default function courses() {
  return (
      <div className={styles.outcontainer}>
      <div className={styles.bodyT}>

       <h1 className={styles.head1}>
        <SettingOutlined style={{fontSize: '150px'}} />
        <br/>
        <br />
          Courses Portal
          <br />
          Coming Soon
        </h1>
        <p>The portal is currently in production. Please return once the portal is completed</p>
    <Button type="primary" href="/">Back to Home</Button>
      </div>
    </div>
    
  );
}