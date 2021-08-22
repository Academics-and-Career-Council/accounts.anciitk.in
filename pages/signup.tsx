import styles from "../styles/SignupStyles.module.scss"
import { useRecoilState, atom } from 'recoil';
//import HCaptcha from "hcaptcha";
import 'antd/dist/antd.css';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {  Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined, CheckOutlined, LockOutlined } from '@ant-design/icons';
import PasswordStrengthBar from 'react-password-strength-bar';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef, useState } from 'react';
const {verify} = require('hcaptcha');
import image from "next/image";
import bgImg from "public/IITKBGsignupPage.jpg"

const Username = atom ({
    key: "username-for-anc",
    default: null,
})
const Password = atom ({
    key: "password-for-anc",
    default: "pass",
})
const PasswordCheck = atom ({
     key: "password-check-for-anc",
     default: null,
 })
 const DisplayCaptcha = atom ({
     key: "disp-hcaptcha",
     default: true,
 })
 const DisplayUnP = atom ({
     key: "dispp-unp",
     default: false,
 })


export default function SignUp () {
   
   const [username, setUsername] = useRecoilState(Username);
   const [password, setPassword] = useRecoilState(Password);
   const [passwordCheck, setPasswordCheck] = useRecoilState(PasswordCheck);
   const [displayCaptcha, setDisplayCaptcha] = useRecoilState(DisplayCaptcha);
   const [displayUnP, setDisplayUnP] = useRecoilState(DisplayUnP);
   const [token, setToken] = useState("")
   const [error, setError] = useState("")
   const captcha = useRef();
   const secret = "0xC697ef90CD69DC373b3000dAeBA365ED7342b8F4"

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
        console.log(username);

    } 
    const OnPasswordChange = (event) => {
        setPassword(event.target.value);
        //console.log(password);
    }
    const onSecPasswordChange = (event) => {
        setPasswordCheck(event.target.value);
        console.log(passwordCheck)
    }

    


    return (



      <div>
            <div>
                {displayCaptcha 
                && 
                <div >
                    <div className={styles.imgOfCaptcha}>
                    <img src="https://anciitk.in/img/anc-logo.png" 
                        alt="AnC IITK logo"
                        height="100px"
                    />
                    </div>
                    <h1 className={styles.centerForCaptcha}>
                        Academics and Career Council,
                        <br/>
                        IIT Kanpur
                    </h1>
                    <p className={styles.centerForCaptchaText}>
                        To safeguard OUR website, please complete this security check 
                    </p>
                   
                    <div className={styles.centerForCaptchaSec}>
                        <HCaptcha
                            sitekey="aa7455a4-6952-46a2-a989-2a3c68bfa3f0"
                            onVerify={token => {setToken(token); 
                                setDisplayCaptcha(false);
                                setDisplayUnP(true)}}
                            onExpire={e=> setToken("")}
                        />
                        
                    </div>
               
                </div>
                }  
            </div>

            <div>
                {displayUnP &&
                <div className={styles.center}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                        <h2> Create A New Account </h2>
                    
                    <br />
                    <br />
                    <div className={styles.flexBox}>
                        <h4> Username</h4>
                    </div>
                    <Input
                        placeholder="Username"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        name="username"
                        type="text"
                        onChange={onUsernameChange}
                    />
                    <br />
                    <br />
                    <div className={styles.flexBox}>
                    <h4> Password</h4>
                    <span className={styles.RighPush}>
                    {(password !== null) && (passwordCheck === password) && <CheckOutlined style={{
                            color: "#5d1"
                        }}/>}
                    </span>  
                    </div>
                    <Input.Password 
                        placeholder="Create Password"
                        prefix={<LockOutlined />}
                        name="password-initial"
                        type="text"
                        onChange={OnPasswordChange}
                    />
                        
                    
                    
                    
                    <PasswordStrengthBar password={password} />
                   
                    <br />
                    <br />
                    <div className={styles.flexBox}>
                    <h4> Re Enter Password</h4>
                    {(password !== null) && (passwordCheck === password) && <CheckOutlined style={{
                            color: "#5d1"
                        }}/>}
                    </div>
                    <Input.Password
                        placeholder="re enter password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                        name="password-confirmation"
                        type="text"
                        onChange={onSecPasswordChange}
                    />
                    <br/>
                    <br/>
                    <button > Create Account </button>
                    
                </div>
                }
            </div>
        </div>    
    )
}
/*
 {error && <p>{error}</p>}
                <button onClick={()=> { onSignUp()}}> 
                    Proceed to Signup
                </button>


    const onSignUp = () => {
        if(!token) {
            setError("You must verify the captcha");
            return;
        }

        setError("");

        verify(secret, token)
            .then((data) => {
                if (data.success === true) {
                    console.log('success!', data);
                    setDisplayCaptcha(false);
                    setDisplayUnP(true);
                } else {
                    console.log('verification failed');
                }
            })
            .catch(console.error).finally(() => {
                setToken("")
            });
    }


    <HCaptcha
                            sitekey="aa7455a4-6952-46a2-a989-2a3c68bfa3f0"
                            onVerify={token => {setToken(token); 
                                setDisplayCaptcha(false);
                                setDisplayUnP(true)}}
                            onExpire={e => setToken("")}
                            ref={captcha}
                        />
*/