import React, { useState, useEffect } from "react";
import styles from "../styles/SignupStyles.module.scss";
import "antd/dist/antd.css";
import { Layout, Menu, Drawer, Space, Popover, Avatar, Button } from "antd";
import {
  EllipsisOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  SolutionOutlined,
  ApartmentOutlined,
  MenuOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { isBrowser, isMobile } from "react-device-detect";
import { useRecoilState } from "recoil";
import { recoilSessionState } from "pkg/recoilDeclarations";
import router from "next/router";

const { Header, Content, Footer, Sider } = Layout;

export default function profile() {
  const [windowWidth, setWindowWidth] = useState(1295);
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [session] = useRecoilState(recoilSessionState);
  const logoutUrl = session?.logoutUrl;
  const UserName = session?.user.name;
  const RollNo = session?.user.rollno;
  const mailId = session?.user.email;
  const branch = session?.user.department;
  const imgUrl = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${RollNo}_0.jpg`;
  const [initials, setInitials] = useState("");
  if(UserName!== undefined && initials === "") {
    var names = UserName.split(' '),
        initial = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initial += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    setInitials(initial);
  }
  // const profileAvatarUrl = `https://gradient-avatar.glitch.me/<seed>`
    

  const onCollapse = () => {
    if (collapsed === false) {
      setCollapsed(true);
    } else if (collapsed === true) {
      setCollapsed(false);
    }
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const content = (
    <div>
      <Button style={{width:"100%", borderColor: "#ffffff", textAlign:"left"}}>
        <Link href="./settings"><p className={styles.logoutMenuItem}>Settings</p></Link>
      </Button>
      <Button style={{width:"100%", borderColor: "#ffffff", textAlign:"left"}}>
        <Link href={`${logoutUrl}`}><p className={styles.logoutMenuItem}>Logout</p></Link>
      </Button>
    </div>
  );

  useEffect(() => {
    if (!session) {
      router.push({
        pathname: "/",
        query: {
          next: "dashboard",
        },
      });
    }
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(document.body.clientWidth);
    }
    window.addEventListener("resize", handleResize);
    setWindowWidth(document.body.clientWidth);
  });
  if (windowWidth <= 850 && collapsed === false) {
    setCollapsed(true);
  }

  if (isBrowser) {
    return (
      <>
        <title>Dashboard</title>

        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link href="/dashboard">Profile page</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ApartmentOutlined />}>
              <Link href={`${process.env.NEXT_PUBLIC_RESOURCES_PORTAL}`}>Resources Portal</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<SolutionOutlined />}>
              <Link href={`${process.env.NEXT_PUBLIC_CAREER_PORTAL}`}>Career Portal</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<BookOutlined />}>
              <Link href="/courses">Courses Portal</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />}>
                <Link href="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ minWidth: "700px" }}>
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                backgroundColor: "#ffffff",
                height: "90px",
                boxShadow: "2px 2px 4px #b1b1b1",
                display: "flex",
              }}
            >
              <Link href="/dashboard">
                <img
                  src="https://anciitk.in/img/anc-logo.png"
                  alt="AnC IITK logo"
                  height="77px"
                  className={styles.profileLogo}
                />
              </Link>
              <Popover placement={"bottomRight"} content={content} title="My Profile" trigger="click">
              <Avatar
                size={50}
                // src={profileAvatarUrl}
                style={{
                  position: "absolute",
                  right: 20,
                  top: 20,
                }}
              >    
                {initials}
              </Avatar>
              </Popover>
            </Header>

            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360, width: "100%" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: 40,
                    width: "100%",
                    float: "right",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "10%" }}></div>
                    <div>
                      <object
                        data={imgUrl}
                        style={{
                          height: 230,
                          boxShadow: "2px 2px 4px #b1b1b1",
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt="IITK"
                          style={{
                            height: 230,
                            boxShadow: "2px 2px 4px #b1b1b1",
                          }}
                        />
                      </object>
                      <br />
                      <br />
                      <hr style={{ border: "1.25px solid #ddd" }}></hr>
                    </div>
                    <div style={{ width: "10%" }}></div>

                    <div style={{ width: "100%", paddingLeft: 30 }}>
                      <div style={{ fontSize: 20, color: "#6b6b6b" }}>
                        Basic Info
                      </div>
                      <hr style={{ border: "1px solid #ddd" }}></hr>
                      <div style={{ fontSize: "17px" }}>
                        Name:
                        <div className={styles.paddingForProfilePage}>
                          {UserName}
                        </div>
                      </div>
                      <br />
                      <br />
                      <div style={{ fontSize: "17px" }}>
                        Roll Number:
                        <div className={styles.paddingForProfilePage}>
                          {RollNo}
                        </div>
                      </div>
                      <br />
                      <br />
                      <div style={{ fontSize: "17px" }}>
                        Email ID:
                        <div className={styles.paddingForProfilePage}>
                          {mailId}
                        </div>
                      </div>
                      <br />
                      <br />
                      <div style={{ fontSize: "17px" }}>
                        Branch:
                        <div className={styles.paddingForProfilePage}>
                          {branch}
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <hr style={{ border: "1px solid #ddd" }}></hr>
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Layout>
      </>
    );
  } else if (isMobile) {
    return (
      <div>
        <title>Dashboard</title>
        <Layout>
          <Space></Space>
          <Drawer
            className={styles.customPadding}
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            key="left"
            bodyStyle={{ padding: 0, backgroundColor: "#001529" }}
          >
            <div
              style={{
                height: "40px",
                margin: "12px",
                background: "rgba(255, 255, 255, 0.3)",
              }}
            />

            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item
                key="1"
                icon={<UserOutlined style={{ fontSize: "20px" }} />}
                className={styles.phoneMenuProfile}
              >
                <Link href="/dashboard">Profile page</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<ApartmentOutlined style={{ fontSize: "20px" }} />}
                className={styles.phoneMenuProfile}
              >
                <Link href={`${process.env.NEXT_PUBLIC_RESOURCES_PORTAL}`}>Resources Portal</Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<SolutionOutlined style={{ fontSize: "20px" }} />}
                className={styles.phoneMenuProfile}
              >
               <Link href={`${process.env.NEXT_PUBLIC_CAREER_PORTAL}`}>Career Portal</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<BookOutlined style={{ fontSize: "20px" }} />}
                className={styles.phoneMenuProfile}
              >
                <Link href="/courses">Courses Portal</Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<SettingOutlined style={{ fontSize: "20px" }} />}
                className={styles.phoneMenuProfile}
              >
                <Link href="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                color: "#fff",
                backgroundColor: "#002140",
                width: "100%",
              }}
            >
              <div className={styles.arrowProfile} onClick={onClose}>
                <LeftOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
          </Drawer>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                backgroundColor: "#ffffff",
                height: "65px",
                display: "flex",
                boxShadow: "2px 2px 4px #b1b1b1",
              }}
            >
              <button
                onClick={showDrawer}
                style={{
                  padding: "10px",
                  border: "0px",
                  backgroundColor: "#ffffff",
                }}
              >
                <MenuOutlined style={{ fontSize: "30px" }} />
              </button>
              <h1 className={styles.base}>Dashboard</h1>
              <div
                style={{
                  fontSize: 30,
                  position: "absolute",
                  right: 20,
                  top: 5,
                }}
              >
                <Popover placement={"bottomRight"} content={content} title="My Profile" trigger="click">
                  <EllipsisOutlined />
                </Popover>
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <br />
              <br />

              <div
                className="site-layout-background"
                style={{ minHeight: "75vh", padding: "10px" }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    paddingRight: "15px",
                    paddingLeft: "15px",
                    paddingTop: "20px",
                    paddingBottom: "25px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        margin: "auto",
                        textAlign: "center",
                        width: 144,
                        height: 180,
                        overflow: "hidden",
                        borderRadius: "50px",
                        boxShadow: "2px 2px 4px #b1b1b1",
                      }}
                    >
                      <object
                        data={imgUrl}
                        style={{
                          margin: "auto",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt="IITK"
                          style={{
                            margin: "auto",
                            textAlign: "center",
                            height: "100%",
                          }}
                        />
                      </object>
                    </div>
                  </div>
                  <h2 style={{ textAlign: "center" }}> Basic Info </h2>
                  <hr></hr>
                  <div style={{ display: "flex", fontSize: "17px" }}>
                    Name:
                    <div className={styles.paddingForProfilePage}>
                      {UserName}
                    </div>
                  </div>
                  <br />
                  <br />
                  <div style={{ display: "flex", fontSize: "17px" }}>
                    Roll Number:
                    <div className={styles.paddingForProfilePage}>{RollNo}</div>
                  </div>
                  <br />
                  <br />
                  <div style={{ display: "flex", fontSize: "17px" }}>
                    Email ID:
                    <div className={styles.paddingForProfilePage}>{mailId}</div>
                  </div>
                  <br />
                  <br />
                  <div style={{ display: "flex", fontSize: "17px" }}>
                    Branch:
                    <div className={styles.paddingForProfilePage}>{branch}</div>
                  </div>
                  <br />

                  <br />
                  <hr></hr>
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
