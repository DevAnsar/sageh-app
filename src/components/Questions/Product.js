import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useSWR from 'swr'

import CustomTheme from '../Theme/Theme';

import {useParams, useHistory} from "react-router-dom";
import axios from "axios";
import {
    ServerUrl,
    NotFindProductImageUrl,
    goUserProfileUrl,
    userName,
    color1,
    colorSilver1,
    colorSilver2,
    colorTxt3
} from '../../config'
import AppBar1 from "../Theme/AppBar1";
import {Swiper, SwiperSlide} from 'swiper/react';
import SagehBtn from '../Theme/SagehBtn';
import NotFindUserImage from '../Icons/user_avatar.jpg'
import SwiperCore, {
    Pagination
} from 'swiper/core';
import {Button, Grid, IconButton, Snackbar} from "@material-ui/core";
import {Close as CloseIcon} from "@material-ui/icons";
import {ReactComponent as PhoneIcon} from "../Icons/phone-receiver-silhouette.svg";

SwiperCore.use([Pagination]);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
    }
}));
const fetcher = (url) => {
    return axios.get(url)
}

function returnImageUrl(url) {

    return url === null ? NotFindProductImageUrl : ServerUrl + url;
}

function ProductImageSlide({src}) {

    return (
        <div style={{
            'width': '100%',
            'height': '300',
        }}>
            <img alt='src' className='w-100' src={src}/>
        </div>
    )
}

function ProductImageSlidePaginate({src}) {

    return (
        <div style={{
            'width': '100%',
            'height': '100$',
        }}>
            <img alt='src' className='w-100' src={src}/>
        </div>
    )
}

const ReturnProduct = ({product}) => {

    const [openAlert, setOpenAlert] = useState(false);
    const history = useHistory();
    const pagination = {
        "clickable": true,
        "renderBullet": function (index, className) {

            return '<span class=\"' + className + '\"></span>';
        }
    }

    console.log('product:', product)
    return (
        <div className='container px-0 px-md-3'>
            <div className={`row`}>
                <div className={`col-6`}>
                    <div className='container-fluid'>

                        <div className='space-between mb-4'>
                            <span className='title-large '>{product?.title}</span>


                            <SagehBtn
                                Color={colorSilver1}
                                Border={`3px solid ${colorSilver1} `}
                            >
                                <span className='score-box-rang'>
                                    4.2
                                    </span>
                                <span>
                                        /5
                                    </span>
                            </SagehBtn>
                        </div>
                        <div className='space-between mb-2'>
                            <span className='title-middle '>
                                نوع کالا:
                                {product?.title}
                            </span>
                        </div>
                        <div className='space-between mb-2'>
                            <span className='title-middle '>
                                قیمت:
                                {product?.title}
                            </span>
                        </div>
                        <div className='space-between mb-2'>
                            <span className='title-middle '>
                                ارائه دهنده:
                                {product?.title}
                            </span>
                        </div>

                        <div className='space-between mt-4'>
                            <span className='title-middle2 '>
                                ...لوریم ایپسوم متن ساختگی برای چاپگر ها و نمایشگرها لوریم
ایپسوم متن ساختگی برای چاپگر ها و نمایشگرها
                            </span>
                        </div>

                        <div className='space-between mt-4'>
                            <div className='title-middle2 '>
                                ...لوریم ایپسوم متن ساختگی برای چاپگر ها و نمایشگرها لوریم
                                ایپسوم متن ساختگی برای چاپگر ها و نمایشگرها
                            </div>

                        </div>


                        <div className='space-between mt-4 pt-3' style={{'border-top':'3px solid #fff'}}>
                            <div className={`center-align`} style={{'cursor':'pointer'}} onClick={() => history.push(goUserProfileUrl(product?.user))} >
                                <SagehBtn
                                    Color={color1}
                                    Border={'3px solid #24D265'}
                                    BorderRadius='50%'
                                    Width={'50px'}
                                    Height={'50px'}
                                    Title={`نمایش پروفایل ${product && userName(product?.user)}`}
                                    styles={{padding: '0'}}
                                >

                                    <img className='w-100' alt={''} src={NotFindUserImage}/>
                                </SagehBtn>

                                <div className={`title-middle pt-1 mr-2`} style={{color: colorTxt3}}>
                                    {product && userName(product?.user)}
                                </div>

                            </div>
                            <div className='center-align '>

                                <SagehBtn
                                    Color={'#FAD100'}
                                    Border={'3px solid #FAD100'}
                                    styles={{'margin-left': '8px'}}
                                    onClickFn={() => setOpenAlert(true)}
                                    FontSize='10pt'
                                    BgColor={'#fff'}
                                >
                                    پیام

                                </SagehBtn>
                                {
                                    product && product.user.tell && (
                                        <SagehBtn
                                            Border={`3px solid ${color1}`}
                                            Color={'#24D265'}
                                            FontSize='10pt'
                                            onClickFn={() => {
                                                product && (product.user.tell && window.open(`tel:${product?.user?.tell}`))
                                            }}
                                            BgColor={'#fff'}
                                        >

                                            <PhoneIcon width={'20px'} className={`ml-1`} fill={color1}/>
                                            تماس


                                        </SagehBtn>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-6 product-slider`}>

                    <Swiper
                        pagination={pagination}
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >

                        <SwiperSlide className={'product-slide space-between'}>
                            <ProductImageSlide
                                src={product?.image?.url ? ServerUrl + product.image.url : NotFindProductImageUrl}/>
                        </SwiperSlide>
                        <SwiperSlide className={'product-slide space-between'}>
                            <ProductImageSlide
                                src={product?.image?.url ? ServerUrl + product.image.url : NotFindProductImageUrl}/>
                        </SwiperSlide>
                        <SwiperSlide className={'product-slide space-between'}>
                            <ProductImageSlide
                                src={product?.image?.url ? ServerUrl + product.image.url : NotFindProductImageUrl}/>
                        </SwiperSlide>
                        {
                            product?.gallery?.map((g) => {
                                return (
                                    <SwiperSlide className={'product-slide space-between'}>
                                        <ProductImageSlide src={ServerUrl + g.url}/>
                                    </SwiperSlide>
                                )
                            })
                        }


                    </Swiper>

                </div>
            </div>


            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={() => setOpenAlert(false)}
                message={(
                    <span>گفتگوی آنلاین در حال توسعه میباشد.</span>
                )}
                action={
                    <React.Fragment>

                    </React.Fragment>
                }
            />

        </div>
    );
}

function Product() {

    const classes = useStyles();
    const {slug} = useParams();
    const {history} = useHistory();
    const {data, error} = useSWR(`http://127.0.0.1:8000/api/v1/products/${slug}`, fetcher);

    console.log('product data :', data);

    const goBackUrl = () => {
        return history.goBack();
    }

    return (
        <CustomTheme>
            <div className="container-fluid ">
                <div className="row pb-3">
                    <div className="container">


                        <AppBar1 AppBarClassName={`mt-3`} title={''} catShow={false} goBack={goBackUrl}/>
                        <div className={`row mt-5  ${!data && classes.loadingBox}`}>
                            <ReturnProduct product={data?.data?.product}/>
                        </div>

                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}

export default Product;