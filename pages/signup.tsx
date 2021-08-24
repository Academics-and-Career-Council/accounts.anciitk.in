import styles from "../styles/SignupStyles.module.scss"
import { useRecoilState, atom } from 'recoil';
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import { UserOutlined, MailOutlined , NumberOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useState } from 'react';
import Image from "next/image";

const Username = atom ({
    key: "username-for-anc",
    default: null,
})
const EmailId = atom ({
    key: "email-id-for-anc",
    default: null,
})
const RollNumber = atom ({
     key: "roll-no-for-anc",
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
    const [mailID, setMailID] = useRecoilState(EmailId);
    const [rollNo, setRollNo] = useRecoilState(RollNumber);
    const [displayCaptcha, setDisplayCaptcha] = useRecoilState(DisplayCaptcha);
    const [displayUnP, setDisplayUnP] = useRecoilState(DisplayUnP);
    const [token, setToken] = useState("");
    const [dispNameMsg, setDispNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [rollMsg, setRollMsg] = useState("");
    const [lvsp1, setLvsp1] = useState(true);
    const [lvsp2, setLvsp2] = useState(true);
    const [lvsp3, setLvsp3] = useState(true);

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    } 
    const onMailIDChange = (event) => {
        setMailID(event.target.value);
    } 
    const onRollNoChange = (event) => {
        setRollNo(event.target.value);
    } 

    const createAccount = () => {
        //further, where username is recoil element 
        //username and password is password
        if ( username === null || username === '' ) {
            setDispNameMsg('please enter a display name');
            setLvsp1(false);
        }
        else if ( username !== null ) {
            setDispNameMsg('');
            setLvsp1(true);
        }
        const mail = mailID;
        if ( mail.search("@iitk.ac.in") === -1 || mail === null) {
            setEmailMsg('Enter a valid IITK email ID!')
            setLvsp2(false);
        }
        else if (mail.search("@iitk.ac.in") !== -1) {
            setEmailMsg('');
            setLvsp2(true);
        }
        const roll = Number(rollNo);
        if ( isNaN(roll) ) {
            setRollMsg('please enter a valid IITK Roll Number!');
            setLvsp3(false);
        }
        else if ( !isNaN(roll)) {
            setRollMsg('');
            setLvsp3(true);
        }
    }

    return (
      <div>
          <title> Sign Up </title>
          <div className={styles.bgWrap}>
                <Image
                    alt="IITK background"
                    src="/IITKBGsignupPage.jpg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            
            <div>
                {displayCaptcha 
                && 
                <div className={styles.container}>
                    <div className={styles.form_signup}>
                        <div className={styles.imgOfCaptcha}>
                            <img src="https://anciitk.in/img/anc-logo.png" 
                                alt="AnC IITK logo"
                                height="100px"
                            />
                            <h1 className={styles.headingForCaptcha}>
                                Academics and Career Council,
                            <br/>
                                IIT Kanpur
                            </h1>
                            <p className={styles.subHeadingForCaptcha}>
                                To safeguard OUR website, 
                                please complete this security check 
                            </p>
                            <HCaptcha
                                sitekey="aa7455a4-6952-46a2-a989-2a3c68bfa3f0"
                                onVerify={token => {setToken(token); 
                                    setDisplayCaptcha(false);
                                    setDisplayUnP(true)}}
                                onExpire={e=> setToken("")}
                            />
                        </div>
                    </div>
                </div>
                }  
            </div>

            <div>
                {displayUnP &&
                <div className={styles.container}>
                <div className={styles.form_signup}>
                <div className={styles.center}>
                    <h2 className={styles.colorHead}> Create A New Account </h2>
                    <br />
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Name</h4>
                    </div>
                    <Input
                        placeholder="Display Name"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        name="Display Name"
                        type="text"
                        onChange={onUsernameChange}
                    />
                     <div className={styles.redMsg}> {dispNameMsg} </div>
                     {lvsp1 && <br />}
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Your IITK email ID</h4>
                    </div>
                    <Input
                        placeholder="IITK email ID"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        name="IITK email ID"
                        type="text"
                        onChange={onMailIDChange}
                    />
                    <div className={styles.redMsg}> {emailMsg} </div>
                    {lvsp2 && <br />}
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Enter Roll Number</h4>
                    </div>
                    <Input
                        placeholder="IITK roll no."
                        prefix={<NumberOutlined className="site-form-item-icon" />}
                        name="IITK roll no."
                        type="text"
                        onChange={onRollNoChange}
                    />
                     <div className={styles.redMsg}> {rollMsg} </div>
                    {lvsp3 && <br />}
                    <br />
                    <Button className={styles.buttonSignp} type="primary" onClick={() => createAccount()}> Create Account </Button>
                
                    <h4 className={styles.colorW}> Already have an account? <a href="#"> login </a></h4>
                </div>
                </div>
                </div>
                }
            </div>
        </div>    
    )
}
/*
import { EyeInvisibleOutlined,
        EyeTwoTone,
        UserOutlined,
        CheckOutlined,
        LockOutlined } from '@ant-design/icons';
import PasswordStrengthBar from 'react-password-strength-bar';


const Password = atom ({
    key: "password-for-anc",
    default: "pass",
})
const PasswordCheck = atom ({
     key: "password-check-for-anc",
     default: null,
 })

    const [password, setPassword] = useRecoilState(Password);
    const [passwordCheck, setPasswordCheck] = useRecoilState(PasswordCheck);

    
    const OnPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const onSecPasswordChange = (event) => {
        setPasswordCheck(event.target.value);
    }
        const [leaveSpace, setLeaveSpace] = useState(true)

        ***************************to check is passwords are same**********************
        var message = document.getElementById('passwordText');
            
        if(password === passwordCheck) {
            
            setLeaveSpace(true);
            message.innerHTML = '';
        }
        else {
            message.innerHTML = 'Enter the same password';
            message.style.color = 'red';
            setLeaveSpace(false);
        }

                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Password ( 8 characters or more )</h4>
                        
                        <span className={styles.RighPush}>
                            {(password !== null) 
                                && (passwordCheck === password) 
                                && <CheckOutlined 
                                    style={{color: "#5d1"}}
                               />
                            }
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
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Re Enter Password</h4>
                        
                        {(password !== null) 
                            && (passwordCheck === password) 
                            && <CheckOutlined 
                                    style={{color: "#5d1"}}
                            />
                        }
                    </div>
                    <Input.Password
                        placeholder="re enter password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                        name="password-confirmation"
                        type="text"
                        onChange={onSecPasswordChange}
                    />
                    <div id="passwordText"> </div>
                    {
                        leaveSpace &&
                        <div>
                            <br/>
                            
                        </div>
                    }
*/