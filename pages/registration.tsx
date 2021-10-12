import React, { useState } from "react";
import styles from "../styles/SignupStyles.module.scss";
import "antd/dist/antd.css";
import { Input, message, Button } from "antd";
import { UserOutlined, NumberOutlined } from "@ant-design/icons";
import HCaptcha from "@hcaptcha/react-hcaptcha";
//import { useState } from 'react';
import Image from "next/image";
import { xenon } from "pkg/xenon";

export default function App() {
  const [displayCaptcha, setDisplayCaptcha] = useState(true);
  const [displayUnP, setDisplayUnP] = useState(false);
  const [unameMsg, setUnameMsg] = useState("");
  const [rollMsg, setRollMsg] = useState("");
  const [token, setToken] = useState("");
  const [query, setQuery] = useState({
    rollNumber: "",
    userName: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);

  return (
    <div>
      <title> Sign Up </title>
      <div className={styles.bgWrap}>
        <Image
          alt="IITK background"
          src="/1.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div>
        {displayCaptcha && (
          <div className={styles.container}>
            <div className={styles.form_signup}>
              <div className={styles.imgOfCaptcha}>
                <img
                  src="https://anciitk.in/img/anc-logo.png"
                  alt="AnC IITK logo"
                  height="100px"
                />
                <h1 className={styles.headingForCaptcha}>
                  Academics and Career Council,
                  <br />
                  IIT Kanpur
                </h1>
                <p className={styles.subHeadingForCaptcha}>
                  To safeguard OUR website, please complete this security check
                </p>
                <HCaptcha
                  sitekey={`${process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}`}
                  onVerify={(token) => {
                    setToken(token);
                    setDisplayCaptcha(false);
                    setDisplayUnP(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {displayUnP && (
          <div className={styles.container}>
            <div className={styles.form_signup}>
              <div className={styles.center}>
                <h2 className={styles.colorHead}> Create A New Account </h2>
                <br />
                <div className={styles.flexBox}>
                  <h4 className={styles.colorW}> Your IITK Username</h4>
                </div>
                <Input
                  placeholder="IITK username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  name="username"
                  type="text"
                  required
                  value={query.userName}
                  onChange={(e) => {
                    setQuery({
                      userName: e.currentTarget.value,
                      rollNumber: query.rollNumber,
                    });
                  }}
                />
                <div className={styles.redMsg}> {unameMsg} </div>
                {unameMsg === "" && <br />}

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
                  onChange={(e) => {
                    setQuery({
                      userName: query.userName,
                      rollNumber: e.currentTarget.value,
                    });
                  }}
                />
                <div className={styles.redMsg}> {rollMsg} </div>
                {rollMsg === "" && <br />}
                <br />
                <br />
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  disabled={submitDisabled}
                  onClick={() => {
                    if (query.userName !== "" && query.rollNumber !== "") {
                      setUnameMsg("");
                      setRollMsg("");
                      setSubmitDisabled(true);
                      var data = new FormData();
                      data.append(
                        "username",
                        query.userName.replaceAll(" ", "")
                      );
                      data.append(
                        "rollno",
                        query.rollNumber.replaceAll(" ", "")
                      );

                      xenon
                        .register(
                          query.userName.replaceAll(" ", ""),
                          query.rollNumber.replaceAll(" ", "")
                        )
                        .then((resp) => {
                          message.success("Account Registered");
                          setSubmitDisabled(false);
                        })
                        .catch((err) => {
                          message.error(
                            err.message || "Unknown error occured!"
                          );
                          setSubmitDisabled(false);
                        });
                    } else {
                      if (query.userName === "") {
                        setUnameMsg("Enter A Username");
                      } else if (query.userName !== "") {
                        setUnameMsg("");
                      }
                      if (query.rollNumber === "") {
                        setRollMsg("Enter A Roll Number");
                      } else if (query.rollNumber !== "") {
                        setRollMsg("");
                      }
                    }
                  }}
                >
                  {" "}
                  {"  "}Create Account{"  "}{" "}
                </Button>

                <h4 className={styles.colorW}>
                  {" "}
                  Already have an account? <a href="/login"> login </a>
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
