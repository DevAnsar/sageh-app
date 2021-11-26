import React from 'react';
import Theme from './../Theme/Theme'
import {Link} from 'react-router-dom';

// import  useStyles from './styles';
import './App.css';

import bazar from './../../images/bazar.png';
import myket from './../../images/myket.png';
import app from './../../images/app.png';

 function Index() {
     // const classes = useStyles();

     return(
         <Theme nav={false} footer={false}>
             <div className="container-fluid">
                 <div className="row">
                     <div className="col-12 header_row pt-1">

                         <Link to={'/categories'}  className='f-1_2 brand_title'>
                             <span className="css-1ou5z0y e3hm0nf5">🌱</span>
                             نسخه ی وب
                             (در حال کار)
                             <span className="css-1ou5z0y e3hm0nf5"> -> </span>
                         </Link>
                     </div>
                     <div className="col-12 first_row">
                         <div className="row  justify-content-center">
                             <div className="col-12 col-md-6 text-center mt-5">
                                 <div className="brand_title">

                                          ساقه
                                     <span style={{fontSize:'12pt',marginRight:'8px'}}>&reg;</span>
                                 </div>
                                 <div className="brand_description">
                                     سیستم یکپارچه سازی فعالیت های کشاورزی و خدمات وابسته
                                 </div>
                                 <div className="row mt-3">
                                     <div className="col-6 text-left">
                                         <a href='#'  className="ml-2">
                                             <img alt='bazar' className="max-100" src={bazar} />
                                         </a>
                                     </div>
                                     <div className="col-6 text-right">
                                         <a href='#'  className="mr-2">
                                             <img alt='myket' className="max-100" src={myket} />
                                         </a>
                                     </div>
                                 </div>

                                 <div className="mt-5">
                                     <img alt='mobile app' className="mobile_app" src={app}/>
                                 </div>
                             </div>

                         </div>
                     </div>
                     <div className="col-12 second_row">
                         <div className="row  justify-content-center">
                             <div className="col-6 text-center mb-3">
                                 <div className="brand_description">
                                     طراحی شده توسط گروه ساقه-2021
                                 </div>
                             </div>
                         </div>

                     </div>
                 </div>
             </div>
         </Theme>
     )
}
export  default Index;