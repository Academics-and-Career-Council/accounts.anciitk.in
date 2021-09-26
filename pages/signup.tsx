import React, { useState } from "react";
import styles from "../styles/SignupStyles.module.scss"
import 'antd/dist/antd.css';
import { Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined , NumberOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
//import { useState } from 'react';
import Image from "next/image";
import axios from "axios";


export default function App() {
  const [displayCaptcha, setDisplayCaptcha] = useState(true);
  const [displayUnP, setDisplayUnP] = useState(false);
  const [emailMsg, setEmailMsg] = useState("")
  const [token, setToken] = useState("");
  const [lvsp2, setLvsp2] = useState(true);
  const [query, setQuery] = useState({
    rollNumber: "",
    email: ""
  });

  const handleParam = () => (e:any) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'email') {
      if ( value.search("@iitk.ac.in") === -1 || value === null) {
        setEmailMsg('Enter a valid IITK email ID!')
        setLvsp2(false);                           
      }
      else if (value.search("@iitk.ac.in") !== -1) {
          setEmailMsg("");
          setLvsp2(true);
      }
    }
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  async function formSubmit(e:any) {
    query.email.replace(" ", "");
    query.rollNumber.replace(" ", "");
    if(emailMsg === "" && query.rollNumber !== null) {
      e.preventDefault();
      const formData = new FormData();
      for (let [key, value] of Object.entries(query)) {
        formData.append(key, value);
      }
      axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_KRATOS_URL,
        data: formData,
      }).then(({ data }) => {
          //const { redirect } = data;
          // Redirect used for reCAPTCHA and/or thank you page
          //window.location.href = redirect;
          console.log(data);
      }).catch((e) => {
          //window.location.href = e.response.data.redirect;
          console.log(e);
      });
    }
  };
  
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
                  <form onSubmit={formSubmit}>
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Your IITK email ID</h4>
                    </div>
                    <Input
                        placeholder="IITK email ID"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        name="email"
                        type="email"
                        required
                        value={query.email}
                        onChange={handleParam()}
                    />
                     <div className={styles.redMsg}> {emailMsg} </div>
                     {lvsp2 && <br />}
                      
                    <div className={styles.flexBox}>
                        <h4 className={styles.colorW}> Enter Roll Number</h4>
                    </div>
                    <Input
                        placeholder="IITK roll no."
                        prefix={<NumberOutlined className="site-form-item-icon" />}
                        name="rollNumber"
                        type="text"
                        required
                        value={query.rollNumber}
                        onChange={handleParam()}
                    />
                    <br />
                    <br />
                    <br />
                    <button className={styles.buttonSignup} type="submit"> Create Account </button>
                
                    <h4 className={styles.colorW}> Already have an account? <a href="/login"> login </a></h4>
                  </form>
                </div>
                </div>
                </div>
                }
            </div>
    </div>
  );
}