import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="made-with">
                <h4>Made with ❤️ by <a href="https://github.com/satvikchachra">Satvik Chachra</a></h4>
            </div>

            <div className="connect-with">
                <h4>Connect with me:</h4>
        </div>

            <div className="social-icons">
                <a href="https://www.github.com/satvikchachra">
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </a>
                <a href="https://www.twitter.com/satvik_codes">
                    <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/satvikchachra">
                    <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </footer>
    );
}

export default Footer;