import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer-distributed footerPostion">
            <div className="footer-left">
                <h3>SA Cinema<span className="iconfooter"> <FontAwesomeIcon icon={faFilm} /></span></h3>
                <p className="footer-links">
                    <a href="/main.html" className="link-1 icon12">Home</a>
                    <a href="/addVisaInfo.html" className="icon12">VisaInfo</a>
                    <a href="#" className="icon12">About</a>
                    <a href="#" className="icon12">Contact</a>
                </p>
                <p className="footer-company-name">Company Name © 2015</p>
            </div>
            <div className="footer-center">
                <div>
                    <FontAwesomeIcon icon={faMapMarker} className="iconfooter fa" />
                    <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPhone} className="iconfooter fa" />
                    <p>+201003674996</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} className="iconfooter fa" />
                    <p className="emailicon"><a href="mailto:sacinemaformovies@gmail.com" className="emailicon">sacinemaformovies@gmail.com</a></p>
                </div>
            </div>
            <div className="footer-right">
                <p className="footer-company-about">
                    <span>About SA Cinema</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>
                <div className="footer-icons">
                    <a href="#"><FontAwesomeIcon icon={faFacebook} className="icon12 fa" /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} className="icon12 fa" /></a>
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} className="icon12 fa" /></a>
                    <a href="#"><FontAwesomeIcon icon={faGithub} className="icon12 fa" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
