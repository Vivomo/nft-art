import React from 'react';
import '../index.css';
import { Layout, Menu } from 'antd';

import { Routes, Route, Link } from "react-router-dom";
import Connect from './Connect';
import ConnectArweave from './ConnectArweave';

import styles from "./TopLayout.module.css"
import Personal from './Personal';

const { Header } = Layout;


export default function TopLayout() {


    return (
        <Layout>
            <Header className="header">
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" >
                    <Menu.Item>
                        <Link to="/">首页</Link>
                    </Menu.Item>

                    <Menu.Item>
                        <Connect />
                    </Menu.Item>

                    <Menu.Item>
                        <ConnectArweave />
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                <Routes>
                    <Route path="/*" element={<Personal />} />
                </Routes>
            </div>
        </Layout>
    );
};
