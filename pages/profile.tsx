import React from 'react';
import Image from 'next/dist/client/image';
import styles from "../styles/SignupStyles.module.scss"
import 'antd/dist/antd.css';
import { Layout, 
    Menu, 
    Breadcrumb, 
    Drawer, 
    Space, 
    Popover, 
    Avatar } from 'antd';
import {
  EllipsisOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  SolutionOutlined,
  ApartmentOutlined,
  MenuOutlined,
  LeftOutlined, 
} from '@ant-design/icons';
import { useState } from 'react';
import { number } from 'prop-types';
import Link from 'next/link'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function profile () {

    const [windowWidth, setWindowWidth] = useState(1295);
    const [visible, setVisible] = useState(false);
    const [ collapsed, setCollapsed ] = useState(false);
    const [phoneCollapsed, setPhoneCollapsed] = useState(false);
    const UserName = "Random User";
    const RollNo = 123456;
    const mailId = "randomuser20@iitk.ac.in";
    const branch = "Electrical Engineering"
    
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
            <Link href="#"><p>Settings</p></Link>
            <Link href="#"><p>Logout</p></Link>
        </div>
    );

    React.useEffect(() => {
        function handleResize() {
            setWindowWidth(document.body.clientWidth);
            //console.log(document.body.clientWidth)
        }
        window.addEventListener('resize', handleResize)
        setWindowWidth(document.body.clientWidth);
    })
//console.log(windowWidth);
    if (windowWidth >=550) {
    return (
        <div>
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
                
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{UserName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" 
                    style={{ padding: 24, minHeight: 360,width:'100%', display:'flex'}}>
                    <div style={{ backgroundColor: '#eaeaea', width:'35%'}}>
                        {/* <Image
                            alt="IITK background"
                            src="/IITKBGsignupPage.jpg"
                            objectFit="cover"
                            quality={100}
                            height={430}
                            width='auto' 
                            //layout='fill'                          
                        /> */}
                        <img alt="IITK background"
                            src="/IITKBGsignupPage.jpg"
                            //height={430}
                            //width='auto'
                            style={{width:'auto', height:430, }}/>
                    </div>
                    <div style={{backgroundColor: "#fff", padding: 40, width:800, float: 'right'}}> 
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
                        <hr style={{border: '1px solid #ddd'}}></hr>
                    </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>
        </div>
    )
    }
    else {
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
                            // position: 'absolute',
                            // right: 10,
                            // top: 20,
                            padding: '10px',
                            border:'0px',
                            backgroundColor: '#ffffff', 
                            //paddingLeft:'180px', 
                            //paddingRight:'20px'
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
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{UserName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" 
                        style={{minHeight: '75vh', padding: '10px'}} 
                    >
                        <div style={{
                            backgroundColor: '#ffffff', 
                            paddingRight: '15px',
                            paddingLeft: '15px',
                            paddingTop: '20px',
                            paddingBottom: '25px',}}>
                        <h2> Basic Info </h2>
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
                        </div><br/><br/>
                        <hr></hr>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>   

    {/*   
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div style={{height: '32px',
  margin: '16px',
  background: 'rgba(255, 255, 255, 0.3)',}} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{UserName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" 
                        style={{minHeight: '75vh', padding: '10px'}} 
                    >
                        <div style={{
                            backgroundColor: '#ffffff', 
                            paddingRight: '15px',
                            paddingLeft: '15px',
                            paddingTop: '20px',
                            paddingBottom: '25px',}}>
                        <h2> Basic Info </h2>
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
                        </div><br/><br/>
                        <hr></hr>
                        </div>
                    </div>
                </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout> */}
            </div>
        )
    }
}                  
/* <Button type="primary" onClick={showDrawer}>
  Open
</Button>
</Space>
<Drawer
className={styles.customPadding}
placement="left"
closable={false}
onClose={onClose}
visible={visible}
key="left"
>
style={{ padding: 24, minHeight: 360, display:'flex'}}>
                   

<Sider className={styles.customPadding}> </Sider>
  
  <Sider >
      
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" 
            icon={<PieChartOutlined />}>
          Option 1
          </Menu.Item>
          <Menu.Item key="2" 
            icon={<DesktopOutlined />}>
          Option 2
          </Menu.Item>
          <SubMenu key="sub1" 
            icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" 
            icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" 
            icon={<FileOutlined />}>
          Files
          </Menu.Item>
      </Menu>
      
  </Sider>
</Drawer> 

<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1" 
                        icon={<PieChartOutlined />}>
                            Option 1
                            </Menu.Item>
                            <Menu.Item key="2" 
                                icon={<DesktopOutlined />}>
                            Option 2
                            </Menu.Item>
                            <SubMenu key="sub1" 
                                icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" 
                                icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" 
                                icon={<FileOutlined />}>
                            Files
                            </Menu.Item>
                        
                   </Menu>
*/