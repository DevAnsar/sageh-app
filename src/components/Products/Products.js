import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomTheme from '../Theme/Theme';
import ProductCard from "../Products/ProductCard";
import {useGetProducts} from '../../hooks/useProducts'

import {useParams} from "react-router-dom";
import AppBar1 from "../Theme/AppBar1";
import Loading from "../Loading";
// import {glide} from "react-tiger-transition";
// glide({
//     name:'glide-right',
//     direction: 'right',
//     enter: {
//         duration: 600,
//         easing: 'ease',
//         opacity: 1,
//         zIndex: 2,
//         delay: 0
//     },
//     exit: {
//         duration: 600,
//         easing: 'ease',
//         opacity: 0.3,
//         zIndex: 1,
//         scale: 1,
//         delay: 0
//     }
// });

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    app_bar:{
        boxShadow:'none'
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    title: {
        flexGrow: 1,
    },
}));

function Products() {

    let { slug } = useParams();
    const {data , isLoading }=useGetProducts(slug);

    // useEffect( () => {
    //     useGetProducts(slug)
    // }, [slug]);

    return (
        <CustomTheme>
            <div className="container-fluid ">
                <div className="row pb-3">
                    <div className="container">

                        <AppBar1 AppBarClassName={`mt-3`} title={''} />

                        {
                            isLoading && <Loading/>
                        }
                        {/*{*/}
                        {/*    !products && <Loading/>*/}
                        {/*}*/}
                        <div className="row mt-5">
                            {
                                data && (data.products && (
                                        data.products.map(product=>{
                                        return <ProductCard {...product} />
                                    })
                                )
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}

export default Products;