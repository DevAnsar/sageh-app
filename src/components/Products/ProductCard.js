import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {ServerUrl, goProductUrl, color1, colorTxt1, colorTxt2, colorTxt3,userName} from '../../config'
import { BorderStyle,Payment} from '@material-ui/icons';
import NotFindUserImage from "../Icons/user_avatar.jpg";
import SagehBtn from "../Theme/SagehBtn";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '&:hover': {
            boxShadow: '0 0 6px ' + color1,
            // color: color1+' !important',

        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '88%',
    },
    content: {
        flex: '1 0 auto',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        paddingBottom: '5px !important'

    },
    title: {
        maxHeight: '30px',
        fontSize: '1rem',
        overflow: 'hidden',
    },
    cover: {
        width: 151,
    },


}));

function ProductCard({slug = '#', title, user, image}) {

    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={`col-12 co-md-4 col-lg-4`}>
            <Link to={goProductUrl(slug)} transition="glide-right" >
                <Card className={`${classes.root} mb-4`}>
                    <CardMedia
                        className={classes.cover}
                        image={image ? ServerUrl + image.url : 'http://127.0.0.1:8000/images/2021/categories/Farming-tools/icon/farming.svg'}
                        title={title}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <div className={`column-space-between h-100`}>
                                <div className={`center-align`}>

                                    <Typography component="h5" variant="h5" color={colorTxt1} className={classes.title}>
                                        {title}
                                    </Typography>
                                </div>

                                <div className={`center-align mb-1 `}>
                                    <div className={`column-start`}>
                                        <div className={`center-align`}>
                                            <BorderStyle className='pt-1 pb-1 title-x-small' style={{color: colorTxt2}}/>
                                            <div className={`title-xx-small pt-1 mr-1`} style={{color: colorTxt2}}>
                                                نوع کالا:

                                                فروشی
                                            </div>
                                        </div>
                                        <div className={`center-align`}>
                                            <Payment className='pt-1 pb-1 title-x-small' style={{color: colorTxt2}}/>
                                            <div className={`title-xx-small pt-1 mr-1`} style={{color: colorTxt2}}>
                                                قیمت:

                                                25 میلیون تومان برای هر سال
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`center-align mb-1 ${classes.title}`}>
                                    <SagehBtn
                                        Border={`2px solid ${color1}`}
                                        Color={color1}
                                        BorderRadius='50%'
                                        Width='25px'
                                        Height='25px'
                                        Pointer={false}
                                        styles={{padding: '0'}}

                                    >

                                        <img className='w-100' alt={''}
                                             src={NotFindUserImage}/>
                                    </SagehBtn>
                                    {/*<PersonOutline className='pt-1 pb-1' style={{color: colorTxt3}}/>*/}
                                    <div className={`title-small pt-1 mr-1`} style={{color: colorTxt3}}>
                                        {userName(user)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                    </div>

                </Card>
            </Link>
        </div>
    )
}

export default ProductCard;