import React from "react";

import HomeImg from './leaf.svg';
import ActiveHomeImg from './leaf_2.svg';

import FAQImg from './help.svg';
import ChatImg from './notifications.svg';
import MeteorologyImg from './sun.svg';
import UserImg from './user.svg';
// import {useLocation} from 'react-router-dom'

function NavIcon({src,active_src,link,title}) {
    // const location=useLocation();

    // console.log('location:',location)
    // if (link === location.pathname){
    //     if (active_src){
    //         src = active_src;
    //     }
    //
    // }
    // console.log("location",location.pathname);
    return (

        <img alt={`#`} title={title} className='nav-link-img mx-2 my-2' src={src}/>
    )
}

const navLinks=[
    {
        exact:true,
        to:'/',
        children: <NavIcon  src={HomeImg} active_src={ActiveHomeImg} title="دسته بندی" />
    },
    {
        exact:true,
        to:'/questions',
        children: <NavIcon src={FAQImg}  title="پرسش و پاسخ" />
    },
    {
        exact:true,
        to:'/chats',
        children: <NavIcon src={ChatImg} title="چت ها" />
    },
    {
        exact:true,
        to:'/meteorology',
        children: <NavIcon src={MeteorologyImg} title="وضعیت آب و هوا" />
    },
    {
        exact:true,
        to:'/account',
        children: <NavIcon src={UserImg} title="پروفایل" />
    },

];

export default navLinks;