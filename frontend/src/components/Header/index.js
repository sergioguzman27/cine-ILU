import React, {useState} from 'react';
import { Menu } from 'antd';
import { HomeFilled, VideoCameraFilled, PlaySquareFilled } from '@ant-design/icons';
import logo from '../../assets/static/movie.svg';

const Header = (props) => {
    const [current, setCurrent] = useState('home')

    return (
        <div className="header mb-2">
            <div className="header-logo pl-md-5 pl-4 mr-5">
                <img style={{width: '3.5rem'}} src={logo} />
                <span className="header-title">Chejo Movies</span>
            </div>
            <div className="header-menu">
                <Menu onClick={() => null} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home" icon={<HomeFilled />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="news" icon={<VideoCameraFilled />}>
                        Estrenos
                    </Menu.Item>
                    <Menu.Item key="salas" icon={<PlaySquareFilled />}>
                        Salas
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default Header;
