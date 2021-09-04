import styles from "../styles/SignupStyles.module.scss"
import 'antd/dist/antd.css';
import { LockOutlined } from '@ant-design/icons';
import { Input, Button } from "antd"; 
import PasswordStrengthBar from 'react-password-strength-bar';
import { atom, useRecoilState } from "recoil";
import Image from "next/dist/client/image";
import { useState } from "react";

const Password = atom ({
key: "password-for-anc",
default: "pass",
})

export default function ChangePassword () {
    const [password, setPassword] = useRecoilState(Password);
    const [messageWarn, setMessageWarn] = useState("")

    const OnPasswordChange = (event: any) => {
        setPassword(event.target.value);
    }
    const changePass = () => {
        //for changing password
        setMessageWarn("You have successfully changed your password. Now you can login with the new password you have entered.")
    }
    const goHome = () => {
        // to do to go home
    }

    return (
        
        <div>
            <title>Change Password</title>
            <div className={styles.bgWrap}>
                <Image
                    alt="IITK background"
                    src="/IITKBGsignupPage.jpg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className={styles.container}>
                <div className={styles.form_changePass}>
                    <LockOutlined style={{ fontSize: '65px', padding: '20px'}}/>
                    <h1 style={{padding: '10px'}}> Change Password </h1>
                    <Input.Password 
                        placeholder="Enter new Password"
                        prefix={<LockOutlined />}
                        name="password"
                        type="text"
                        onChange={OnPasswordChange}
                    />
                    <PasswordStrengthBar password={password} />
                    <br />
                    
                    <Button 
                        className={styles.buttonSignp} 
                        type="primary" 
                        onClick={() => changePass()}> 
                            Apply Changes 
                    </Button>
                    <Button 
                        className={styles.buttonSignp}  
                        onClick={() => goHome()}> 
                            Cancel 
                    </Button>
                    <div className={styles.redMsg}>
                        <div style={{fontSize: '12px'}}>
                            {messageWarn}
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}