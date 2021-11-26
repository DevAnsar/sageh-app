import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import useSWR from 'swr'
import CustomTheme from '../Theme/Theme';

import {useParams, useHistory} from "react-router-dom";
import axios from "axios";
import AppBar1 from "../Theme/AppBar1";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CatNav from "../Theme/CatNav";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import {NotFindUserImageUrl, ServerUrl, userName, color1, colorTxt1, colorTxt2, colorRed1} from '../../config';
import SagehBtn from "../Theme/SagehBtn";
import {ReactComponent as PhoneIcon} from '../Icons/phone-receiver-silhouette.svg';
import {ReactComponent as MapIcon} from '../Icons/map-locator.svg';
import NotFindUserImage from '../Icons/user_avatar.jpg';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    app_bar: {
        // boxShadow: 'none'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    loadingBox: {
        '-webkit-filter': 'blur(5px)',
        '-moz-filter': 'blur(5px)',
        '-o-filter': 'blur(5px)',
        '-ms-filter': 'blur(5px)',
        'filter': 'blur(5px)',
        'background-color': 'inherit',
    },
    avatarBox: {
        width: '100%',
        height: '350px',
        overflow: 'hidden'
    },
    avatar: {
        width: '100%',
    }
}));

const fetcher = (url) => {
    return axios.get(url)
}

function UserProfile() {


    let history = useHistory();
    const classes = useStyles();
    let {id} = useParams();

    const {data, error} = useSWR(`${ServerUrl}/api/v1/users/${id}`, fetcher);


    // React.useEffect(async () => {


    return (
        <CustomTheme>
            <div className="container-fluid ">
                <div className="row pb-3">
                    <div className="container">
                        <AppBar1 AppBarClassName={`mt-3`} catShow={false} title={'ماشین آلات ادوات کشاورزی رضایی'}
                                 goBack={''}/>

                        <div className={`row mt-3  ${!data && classes.loadingBox}`}>

                            <div className='col-12  px-0 px-md-3'>

                                <div className={classes.avatarBox}>
                                    <img className={classes.avatar} src={`http://localhost:8000/images/farm.jpg`}
                                         alt={'#'}/>
                                </div>

                                <Paper elevation={2}>
                                    <AppBar color='white' position="static"
                                            className={` py-2 px-2 ${classes.app_bar}`}>

                                        <Toolbar>
                                            <div className='container'>
                                                <div className='row'>

                                                    <div className='col-7 col-md-8 col-lg-9'>
                                                        <div
                                                            className={`container space-between px-0  ${classes.title}`}>

                                                            <div className={`center-align`}>

                                                                <SagehBtn
                                                                    Border={`3px solid ${color1}`}
                                                                    Color={color1}
                                                                    BorderRadius='50%'
                                                                    Width='50px'
                                                                    Height='50px'
                                                                    Pointer={false}
                                                                    styles={{padding: '0'}}

                                                                >

                                                                    <img className='w-100' alt={''}
                                                                         src={NotFindUserImage}/>
                                                                </SagehBtn>

                                                                <span className='title-middle mr-2'
                                                                      style={{color: colorTxt1}}>
                                                            {data ? userName(data.data) : '...'}

                                                        </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-5 col-md-4 col-lg-3  center-align justify-end'>

                                                        {
                                                            data && data.data.tell && (
                                                                <div className={`center-align`}>
                                                                    <SagehBtn
                                                                        Title={`نمایش کاربر در google map`}
                                                                        className={'ml-2'}
                                                                        Color={colorRed1}
                                                                        Border={`none`}
                                                                        BorderRadius={'0'}
                                                                        Width={'47px'}

                                                                        onClickFn={() => {
                                                                            data && (data.data.tell && window.open(`https://www.google.com/maps/place/West+Azerbaijan+Province,+Urmia,+Jahangirzadeh+7,+Iran/@37.5454564,45.0584032,17z/data=!3m1!4b1!4m5!3m4!1s0x40055373e308ef69:0xb6ca8f54c509da35!8m2!3d37.5454534!4d45.0599286`))
                                                                        }}
                                                                    >
                                                                        <MapIcon fill={colorRed1}/>
                                                                    </SagehBtn>
                                                                    <SagehBtn
                                                                        Title={`تماس تلفی`}
                                                                        className={'ml-2'}
                                                                        Color={color1}
                                                                        Border={`none`}
                                                                        BorderRadius={'0'}
                                                                        Width={'47px'}

                                                                        onClickFn={() => {
                                                                            data && (data.data.tell && window.open(`tel:${data?.data?.tell}`))
                                                                        }}
                                                                    >

                                                                        <PhoneIcon fill={color1}/>

                                                                    </SagehBtn>
                                                                </div>
                                                            )
                                                        }


                                                        <SagehBtn

                                                            Color={color1}
                                                            Border={`3px solid ${color1}`}
                                                        >

                                                            دنبال کردن

                                                        </SagehBtn>


                                                    </div>
                                                </div>
                                            </div>
                                        </Toolbar>
                                    </AppBar>
                                    <div className='container bg-white '>
                                        <div className="col-12 pt-2 pb-2  border-top">
                                            <div className={`center-align`}>
                                                <div className={'ml-5'}>
                                                <span className={`title-large ml-2`}
                                                      style={{color: colorTxt1}}>15</span>
                                                    <span className={`title-small`}
                                                          style={{color: colorTxt2}}>محصول / خدمات</span>
                                                </div>
                                                <div>
                                                <span className={`title-large ml-2`}
                                                      style={{color: colorTxt1}}>120</span>
                                                    <span className={`title-middle2`}
                                                          style={{color: colorTxt2}}>دنبال کننده</span>
                                                </div>
                                            </div>

                                            <div className={`center-align mt-3`}>
                                                <div>
                                                <span className={`title-middle2 ml-2`}
                                                      style={{color: colorTxt1}}>آدرس: </span>
                                                    <span className={`title-middle`}
                                                          style={{color: colorTxt2}}>
                                                    ارومیه ، خیابان عدالت کوی هفتم پلاک5
                                                </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Paper>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}

export default UserProfile;