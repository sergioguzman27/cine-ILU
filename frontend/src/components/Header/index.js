import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import { Link, Redirect } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeFilled, VideoCameraFilled, PlaySquareFilled, HourglassFilled } from '@ant-design/icons';
import logo from '../../assets/static/movie.svg';

const Header = (props) => {
    const [current, setCurrent] = useState('home')

    const navegar = (e) => {
        setCurrent(e.key);
        if (e.key == 'home'){
            props.history.push('/');
        } else {
            props.history.push(`/${e.key}`);
        }

    }

    return (
        <div className="header mb-2">
            <div className="header-logo pl-md-5 pl-4 mr-5">
                <img style={{width: '3.5rem'}} src={logo} />
                <span className="header-title">Chejo Movies</span>
            </div>
            <div className="header-menu">
                <Menu onClick={navegar} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home" icon={<HomeFilled />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="funciones" icon={<VideoCameraFilled />}>
                        Funciones
                    </Menu.Item>
                    <Menu.Item key="salas" icon={<PlaySquareFilled />}>
                        Salas
                    </Menu.Item>
                    <Menu.Item key="proximamente" icon={<HourglassFilled />}>
                        Proximamente
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(Header);
