import React from 'react';
import Theme from "../../components/Theme/Theme";
import NotFoundImg from  './../../images/404.svg'

function NotFound() {

    return (
        <Theme>
            <div className="container" >
                <div style={{display:'flex',alignItems:'center',minHeight:'80vh',width:'100%',flexDirection:'column',justifyContent:'center'}}>
                    <img style={{width:'200px'}} src={NotFoundImg} />
                    <h5 className="mt-2">صفحه ی مورد نظر یافت نشد</h5>
                </div>

            </div>

        </Theme>
    )
}

export default NotFound;