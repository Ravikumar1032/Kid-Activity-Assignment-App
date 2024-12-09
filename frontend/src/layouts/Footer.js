import React from 'react';

const Footer = () => {
    return (
        <footer>
            {/* <div className="container row d-flex justify-content-center">
                    <div className="col-lg-4 text-center">
                        <h2 className="footer-heading">Navigation</h2>
                        <ul className="list-unstyled">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 text-center">
                        <h2 className="footer-heading">Navigation</h2>
                        <ul className="list-unstyled">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div> */}

            <div className="footer bg-dark text-white text-center py-1" style={{position:'fixed', bottom:'0',left:'0', width:'100%'}}>
                <p>&copy; 2024 Kids Adventure Club. All Rights Reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
