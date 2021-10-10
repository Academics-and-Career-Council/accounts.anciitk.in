import React, { useState} from "react";
import styles from "../styles/SignupStyles.module.scss"
import 'antd/dist/antd.css';
import { Layout, 
    Menu,  
    Drawer, 
    Space, 
    Popover, 
    Avatar } from 'antd';
import {
  EllipsisOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  SolutionOutlined,
  ApartmentOutlined,
  MenuOutlined,
  LeftOutlined, 
} from '@ant-design/icons';
import Link from 'next/link'
import { isBrowser, isMobile } from 'react-device-detect';
import { xenon } from "pkg/xenon";
import { useRecoilState } from "recoil";
import { recoilSessionState } from "pkg/recoilDeclarations";


const { Header, Content, Footer, Sider } = Layout;



export default function profile (profileData:any, error:any) {
    // if(error) {
    //     console.log(error);
    //     console.log(profileData)
    //     return <div> An Error Occured </div>
    // }
    const [windowWidth, setWindowWidth] = useState(1295);
    const [visible, setVisible] = useState(false);
    const [ collapsed, setCollapsed ] = useState(false);
    const [logoutUrl, setLogoutUrl] = useState<string>('')
    const [session, setSession] = useRecoilState(recoilSessionState);
    console.log(session); 
    
    const UserName = profileData.Username;
    const RollNo = profileData.RollNo;
    const mailId = `${profileData.Username}@iitk.ac.in`;
    const branch = profileData.Department;
    const imgUrl = `https://iitk.ac.in/counsel/old/family_tree/images/${RollNo}_0.jpg`;

    const onCollapse = () => {
        if(collapsed === false ) {
            setCollapsed(true);
        }
        else if (collapsed === true) {
            setCollapsed(false);
        }
    }
    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () =>{
        setVisible(false);
    }
    const content = (
        <div>
            <Link href="./settings"><p>Settings</p></Link>
            <Link href={logoutUrl}><p>Logout</p></Link>
        </div>
    );


    // useEffect(() => {
    //     ory
    //       .createSelfServiceLogoutFlowUrlForBrowsers()
    //       .then(({ data }) => {
    //         setLogoutUrl(String(data.logout_url))
    //       })
    //       .catch((err: AxiosError) => {
    //         switch (err.response?.status) {
    //           case 401:
    //             // do nothing, the user is not logged in
    //             return
    //         }
    
    //         // Something else happened!
    //         return Promise.reject(err)
    //       })
    //   })

    React.useEffect(() => {
        function handleResize() {
            setWindowWidth(document.body.clientWidth);
            //console.log(document.body.clientWidth)
        }
        window.addEventListener('resize', handleResize)
        setWindowWidth(document.body.clientWidth);
    })
    if(windowWidth <= 700 && collapsed === false) {
        setCollapsed(true);
    }

    if (isBrowser) {
    return (
        <>
        <title>Profile Page</title>

        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" 
                        icon={<UserOutlined />}>
                    <Link href="/profile">Profile page</Link>
                    </Menu.Item>
                    <Menu.Item key="2" 
                        icon={<ApartmentOutlined />}>
                        Accounts Portal
                    </Menu.Item>
                    <Menu.Item key="3" 
                        icon={<SolutionOutlined />}>
                        Career Portal
                    </Menu.Item>
                    <Menu.Item key="4"
                        icon={<BookOutlined />}>
                        Courses Portal
                    </Menu.Item>
                    <Menu.Item key="5" 
                        icon={<SettingOutlined />}>
                    Settings
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" 
                    style={{ padding: 0, 
                        backgroundColor: '#ffffff', 
                        height: '90px',
                        boxShadow: '2px 2px 4px #b1b1b1',
                        display: 'flex'
                    }} 
                >
                <Link href="/profile">
                    <img src="https://anciitk.in/img/anc-logo.png" 
                        alt="AnC IITK logo"
                        height="77px"
                        className={styles.profileLogo}
                    />
                </Link> 
                <Avatar
                    size={50}
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                        //fontSize: '50px', 
                        //backgroundColor: '#1890ff',
                    }}
                >
                    <Popover content={content} title="My Profile" trigger="click">
                        <UserOutlined style={{fontSize: '25px'}}/>
                    </Popover>
                </Avatar>
            </Header>
            
            <Content style={{ margin: '0 16px' }} >
                <div className="site-layout-background" 
                    style={{ padding: 24, minHeight: 360,width:'100%'}}
                >
                    <div style={{backgroundColor: "#fff", padding: 40, width:'100%', float: 'right'}}> 
                    <div style={{display: 'flex'}}>
                    <div style={{width:"20%"}}></div>
                    <div >
                        <img src={imgUrl}
                            alt="iitk Photo"
                            style={{ height:230, boxShadow: '2px 2px 4px #b1b1b1'}}
                        />
                        <br />
                        <br />
                        <hr style={{border: '1.25px solid #ddd'}}></hr>
                    </div>
                    
                    <div style={{width: '100%', paddingLeft: 30,}}>
                        <div style={{fontSize:20, color: "#6b6b6b"}}>Basic Info</div>
                        <hr style={{border: '1px solid #ddd'}}></hr>
                        <div style={{fontSize: '17px'}}>User Name:
                            <div className={styles.paddingForProfilePage}>
                                {UserName}
                            </div>
                        </div>
                        <br/><br/>
                        <div style={{fontSize: '17px'}}>Roll Number:
                            <div className={styles.paddingForProfilePage}>
                                {RollNo}
                            </div>
                        </div><br/><br/>
                        <div style={{fontSize: '17px'}}>Email ID:
                            <div className={styles.paddingForProfilePage}>
                                {mailId}
                            </div>
                        </div><br/><br/>
                        <div style={{ fontSize: '17px'}}>Branch:
                            <div className={styles.paddingForProfilePage}>
                                {branch}
                            </div>
                        </div><br/>
                    </div>
                    </div>
                    <hr style={{border: '1px solid #ddd'}}></hr> 
                    </div>
                     
                </div>
                
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>
        </>
    )
    }
    else if (isMobile) {
        return (
            <div>
            <Layout>
               <Space>
              
                </Space>
                <Drawer
                    className={styles.customPadding}
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key="left"
                    bodyStyle={{padding:0, backgroundColor:'#001529'}}
                >
                    <div style={{height: '40px',
                        margin: '12px',
                        background: 'rgba(255, 255, 255, 0.3)',}} />
                   
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
                    <Menu.Item key="1" 
                        icon={<UserOutlined style={{fontSize:'20px'}}/>} 
                        className={styles.phoneMenuProfile}
                    >
                    <Link href="/profile">Profile page</Link>
                    </Menu.Item>
                    <Menu.Item key="2" 
                        icon={<ApartmentOutlined style={{fontSize:'20px'}}/>} 
                        className={styles.phoneMenuProfile}
                    >
                        Accounts Portal
                    </Menu.Item>
                    <Menu.Item key="3" 
                        icon={<SolutionOutlined style={{fontSize:'20px'}}/>} 
                        className={styles.phoneMenuProfile}
                    >
                        Career Portal
                    </Menu.Item>
                    <Menu.Item key="4"
                        icon={<BookOutlined style={{fontSize:'20px'}}/>} 
                        className={styles.phoneMenuProfile}
                    >
                        Courses Portal
                    </Menu.Item>
                    <Menu.Item key="5" 
                        icon={<SettingOutlined style={{fontSize:'20px'}}/>} 
                        className={styles.phoneMenuProfile}
                    >
                        Settings
                    </Menu.Item>  
                </Menu>
                <div style={{
                    position:'absolute', 
                    bottom: '0px', 
                    color:'#fff', 
                    backgroundColor:'#002140',
                    width:'100%'}}>
                    <div className={styles.arrowProfile} onClick={onClose}><LeftOutlined style={{fontSize:'20px'}}/></div>
                </div>
                </Drawer>
                <Layout className="site-layout">
                <Header className="site-layout-background" 
                    style={{ padding: 0, 
                        backgroundColor: '#ffffff', 
                        height: '65px',
                        display:'flex',
                        boxShadow: '2px 2px 4px #b1b1b1' 
                    }} 
                >
                    
                    
                    <button 
                        onClick={showDrawer} 
                        style={{
                            padding: '10px',
                            border:'0px',
                            backgroundColor: '#ffffff', 
                        }}
                    >
                    <MenuOutlined style={{fontSize: "30px"}}/> 
                        
                    </button>
                    <h1 className={styles.base}>Dashboard</h1>
                    <div
                        
                        style={{
                            fontSize:30,
                            position: 'absolute',
                            right: 20,
                            top: 5,
                        }}
                    >
                        <Popover content={content} title="My Profile" trigger="click">
                        <EllipsisOutlined />
                        </Popover>
                    </div>

                   
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <br />
                    <br />

                    
                    <div className="site-layout-background" 
                        style={{minHeight: '75vh', padding: '10px'}} 
                    >
                        
                        
                        <div style={{
                            backgroundColor: '#ffffff', 
                            paddingRight: '15px',
                            paddingLeft: '15px',
                            paddingTop: '20px',
                            paddingBottom: '25px',}}>
                                <div style={{width: '100%'}}>
                            <div style={{
                                margin:'auto', 
                                textAlign:'center',
                                width:144,
                                height:180,
                                overflow: 'hidden', 
                                borderRadius:'50px',
                                boxShadow: '2px 2px 4px #b1b1b1',}}>
                        <img src={imgUrl}
                            alt="iitk Photo"
                            style={{margin:'auto', textAlign:'center', width:'100%', }}
                        />
                            
                            </div>
                            </div>
                        <h2 style={{textAlign: 'center'}}> Basic Info </h2>
                        <hr></hr>
                        <div style={{display: 'flex', fontSize: '17px'}}>User Name:
                            <div className={styles.paddingForProfilePage}>
                                {UserName}
                            </div>
                        </div><br/><br/>
                        <div style={{display: 'flex', fontSize: '17px'}}>Roll Number:
                            <div className={styles.paddingForProfilePage}>
                                {RollNo}
                            </div>
                        </div><br/><br/>
                        <div style={{display: 'flex', fontSize: '17px'}}>Email ID:
                            <div className={styles.paddingForProfilePage}>
                                {mailId}
                            </div>
                        </div><br/><br/>              
                        <div style={{display: 'flex', fontSize: '17px'}}>Branch:
                            <div className={styles.paddingForProfilePage}>
                                {branch}
                            </div>
                            </div><br/>
                        
                            <br/>
                        <hr></hr>

                        </div>
                    </div>
                    
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>   

            </div>
        )
    }
}                  

// profile.getInitialProps = async (ctx:any) => {
//     // try {
//     //     const profile = await axios.get(`${process.env.NEXT_PUBLIC_XENON_URL}/whoami`, 
//     //       {
//     //         withCredentials: true,
//     //       });
//     //     const profileData = profile.data;
//     //     return {profileData};
//     // } catch (error) {
//     //     return {error};
//     // }
//     xenon
//         .whoami()
//         .then((resp) => {
//             console.log('User is', resp)
//             return resp;
//         })
//         .catch((err) => {
//             console.log(err.message);
//             return err;
//         })
// }
