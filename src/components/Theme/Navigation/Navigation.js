import React from 'react';

import {Link, NavLink} from 'react-router-dom';
import navLinks from './navlinks/navlinks'
import sagehPNG from "../../Icons/sageh(2).png";
import SagehBtn from "../SagehBtn";

function Navigation() {
    const [show, setShow] = React.useState(false);
    // // console.log("<Navigation /> rendered");
    //
    const handleShow = () => {
        if (typeof window !== "undefined") {
            if (window.pageYOffset > 120) {
                if (!show) {
                    console.log("set to true");
                    setShow(true);
                }
            }
            if (window.pageYOffset < 120) {
                console.log("set to false");
                setShow(false);
            }
        }
    };

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleShow);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", handleShow);
            }
        };
    }, []);

    return (
        <div style={{'z-index': '100'}}
             className={`${show ? 'sageh_navigation sticky' : 'sageh_navigation'} container-fluid bg-white MuiPaper-elevation2 py-2 mobile-menu`}>
            <div className="row ">
                <div className="col-md-7 col-lg-8 d-sm-block d-none ">


                    <Link to='/' exact>

                        <div className='center-align'>
                            <SagehBtn
                                Width={'50px'}
                                BorderRadius={'50%'}
                                Border='none'
                                styles={{padding: '0'}}
                            >
                                <img className='w-100' alt={''}
                                     src={sagehPNG}/>

                            </SagehBtn>
                            <span>
                                     ساقه
                                 </span>
                        </div>
                    </Link>

                </div>
                <div className="col-sm-12 col-md-5 col-lg-4">

                    <div className="navigation-section">
                        {
                            navLinks.map(nav => (

                                <NavLink
                                    exact={nav.exact || false}
                                    activeClassName="active"
                                    to={nav.to}
                                >
                                    {nav.children}
                                </NavLink>

                            ))
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Navigation;