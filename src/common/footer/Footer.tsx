import React from 'react';
import './footerStyle.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <p className="copyright">
                    Copyright © {new Date().getFullYear()} All rights reserved | The Plaza
                </p>
            </div>
        </footer>
    );
};
export default Footer;
