import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
import navBarItems from 'constants/navBarContent';


const { Header } = Layout;

function NavBar() {
    return (
        <Header>
          <div className="logo" />
            <BrowserRouter>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={navBarItems}/>
            </BrowserRouter>
        </Header>
      );
}

export default NavBar;
