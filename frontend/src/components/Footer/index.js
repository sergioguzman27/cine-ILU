import React from 'react';
import {FacebookFilled, InstagramFilled, LinkedinFilled} from '@ant-design/icons';

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    Designed by&nbsp;&nbsp;
                    <a href="https://portafolio-sergio.herokuapp.com/">Sergio Guzmán</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;Powered by&nbsp;&nbsp;
                    <a href="https://es.reactjs.org/">React</a>
                </p>
                <div className="footer-icons">
                    <a className="mx-2" href="https://www.facebook.com/sergio.guzman.330/">
                        <FacebookFilled  style={{fontSize: "25pt", color: "#4f81c7" }}  />
                    </a>
                    <a className="mx-2" href="https://www.facebook.com/sergio.guzman.330/">
                        <InstagramFilled style={{fontSize: "25pt", color: "#4f81c7" }}  />
                    </a>
                    <a className="mx-2" href="https://www.facebook.com/sergio.guzman.330/">
                        <LinkedinFilled style={{fontSize: "25pt", color: "#4f81c7" }}  />
                    </a>

                </div>
            </div>

        </footer>
    )
}

export default Footer;