//rsc
//rsf
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from "./Button";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>
    {
        if(window.innerWidth <= 960)
        {
            setButton(false);
        }
        else
        {
            setButton(true);
        }
    };

    useEffect(() =>
    {
        showButton()
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                {/*<h1>Title</h1>*/}
                <div className="navbar-container">
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Benefit Fitness <i className='fab fa-typo3' />
                    </Link>
                    {/*<img src={BenefitLogo1}/>*/}
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className ='nav-item'>
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to='/services' className="nav-links" onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to='/products' className="nav-links" onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>
                        <li className ='nav-item'>
                            <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign In
                            </Link>
                        </li>
                    </ul>
                    {/*<Button className="nav-links" buttonStyle="btn--outline">SIGN IN</Button>*/}
                    {button && <Button className="nav-links-mobile" buttonStyle='btn--outline'>SIGN IN</Button>}
                </div>

            </nav>
        </>
    );
}

export default Navbar;