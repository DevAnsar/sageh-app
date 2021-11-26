import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import useCategories from "../../hooks/useCategories";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import {Link} from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react';
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";


// const color_green = green[100];
const useStyles = makeStyles((theme) => ({
    categories: {},
    button: {
        margin: theme.spacing(0.5),
        whiteSpace: 'nowrap',
    },
    swiperSlide: {
        width: 'auto !important'
    }
}));

const CategoryButton = withStyles((theme,select,selected_color) => ({

    root: {
        color: theme.palette.getContrastText(green[100]),

        backgroundColor: select??'#fff',//green[100]
        '&:hover': {
            backgroundColor: selected_color??green[200],
            color:'#fff',
        },
        '&:hover  > span': {
            color:'#fff',
        },
        '&:active': {
            // boxShadow: 'none',
            // backgroundColor: '#0062cc',
            // borderColor: '#005cbf',
        },
        '&:focus': {
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },

    },
}))(Button);


// const CategoryIcon = ({url, title, width = 10}) => {
//     return (
//         <img alt={title} src={url} style={{width: `${width}px`}}/>
//     )
// }


function CatNav({selected_slug,classNames}) {

    const classes = useStyles();
    const {loading, data} = useCategories();




    return (

            <div className={`center-align ${classNames}`}>

                <Swiper
                    spaceBetween={0}
                    slidesPerView={7}
                    breakpoints={{

                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 5,
                            spaceBetween: 0
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        }
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className={`${classes.categories}`}>
                    {
                        data?.categories.map(category => {
                            return (
                                <SwiperSlide className={`${classes.swiperSlide} categories-slide`}>
                                    <Link to={`/products/${category.slug}`}>
                                        <CategoryButton
                                            select={category.slug === selected_slug}
                                            selected_color={'#a5d6a7'}
                                            variant="outlined" // outlined contained
                                            size="small"
                                            className={`categories-slide-item ${classes.button} ${ category.slug === selected_slug ? 'selected':'' } `}

                                        >
                                            {category.title}
                                        </CategoryButton>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>

            </div>


    )
}

export default CatNav;