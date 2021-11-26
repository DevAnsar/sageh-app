import React,{useEffect} from 'react';
import useCategories from "../../hooks/useCategories";
import {makeStyles} from '@material-ui/core/styles';
import {Link, useHistory, useParams} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import CatNav from "./CatNav";
import MenuIcon from "@material-ui/icons/Menu";
import {colorTxt1} from "../../config";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    app_bar: {
        boxShadow: 'none'
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
    }
}));


function AppBar1({AppBarClassName,catShow=true ,title='', goBack = {}}) {

    const classes = useStyles();
    const history = useHistory();
    let {slug} = useParams();


    return (

        <div className={`${AppBarClassName} row`}>
            <div className='col-12'>

                <AppBar color='transparent' position="static" className={classes.app_bar}>
                    <Toolbar>
                        <div className='container px-0'>
                            <div className='row'>
                                <div className='col-10 col-md-11'>
                                    <div className={`container px-0 ${classes.title}`}>
                                        <div className="row ">
                                            <div className={`${title.length > 15 ? 'col-4' : 'col-2'}  center-align`}>
                                                <IconButton edge="start" className={classes.menuButton}
                                                            color="inherit"
                                                            aria-label="menu">
                                                    <MenuIcon/>
                                                </IconButton>
                                                <span style={{color:colorTxt1}} className='title-small font-s d-none d-md-inline-block'>
                                                    {title && (
                                                        <>{title}</>
                                                    )}

                                                </span>
                                            </div>
                                            {
                                                catShow && (
                                                    <CatNav classNames={`${title.length > 15 ? 'col-7' : 'col-10'}`} selected_slug={slug} />
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='col-2 col-md-1'>
                                    <IconButton onClick={() => window.location = goBack} edge="start"
                                                className={classes.menuButton} color="inherit"
                                                aria-label="menu">
                                        <ChevronLeft/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        </div>
    )
}

export default AppBar1;