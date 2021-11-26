import React from 'react';
import {Link} from 'react-router-dom';


function Footer() {

    console.log("<Navigation /> rendered");

    return (
        <footer>
            <div className="container-fluid  py-2">
                <div className="row py-2 justify-content-center">
                    <div className="col-12 text-center text-secondary" >
                        <Link to='/' exact className="text-secondary">
                            <h6>
                                حق کپی رایت محفوظ میباشد | all right reserved &copy;
                            </h6>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;