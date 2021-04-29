import React from 'react'
import logo from './Canada-BC-Tagline.png'
function Footer() {
    return (
        <footer className="footer">
            <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
            <div className="col-md-6">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a 
                            className="nav-link"
                            href="https://www2.gov.bc.ca/gov/content/home/disclaimer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Disclaimer
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link"
                            href="https://www2.gov.bc.ca/gov/content/home/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link"
                            href="https://www2.gov.bc.ca/gov/content/home/accessibility"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Accessibility
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link"
                            href="https://www2.gov.bc.ca/gov/content/home/copyright"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Copyright
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="https://www2.gov.bc.ca/gov/content/home/contact-us"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact Us
                        </a>
                    </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="media">
                        <div className="media-left">
                        <img 
                            className=""
                            src={logo}
                            style={{width: "304px", height: "41px"}}
                            alt="B.C. Government Logo" />
                        </div>
                        <div className="media-body">
                    <p style={{marginLeft: '10px', marginBottom: '0px', width:"400px", lineHeight: '1.2', color:"white"}}>Funding provided by the Government of Canada through the Canada-British Columbia Workforce Development Agreement.</p>
                    </div>
                    </div>
                </div>
            </div>
            </nav>
        </footer>           
    )
}

export default Footer