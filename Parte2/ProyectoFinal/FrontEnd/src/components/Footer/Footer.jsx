import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faTiktok,
    faFacebook,
    faGithub,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className=''>
            <div className="footer-icons">
                <Link to="https://www.instagram.com/peaceicyar" target='_blank'>
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="https://www.tiktok.com/" target='_blank'>
                    <FontAwesomeIcon icon={faTiktok} />
                </Link>

                <Link to="https://www.facebook.com/" target='_blank'>
                    <FontAwesomeIcon icon={faFacebook} />
                </Link>

                <Link to="https://github.com/" target='_blank'>
                    <FontAwesomeIcon icon={faGithub} />
                </Link>

                <Link to="https://twitter.com/" target='_blank'>
                <FontAwesomeIcon icon={faTwitter} />
                </Link>
                
            </div>
            <div className="contact-section">
                <h3>Contacto</h3>
                <p>Horario: Lunes a Viernes, de 9am a 5pm</p>
                <p>Teléfono: 123-456-7890</p>
                <p>Email: contacto@peaceizy.com</p>
            </div>
        </footer>
    );
};

export default Footer;
