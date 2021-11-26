import React, {useState} from 'react';
import {makeStyles, alpha} from '@material-ui/core/styles';
import CustomTheme from '../Theme/Theme';
// import {sagehAxios} from '../../apis/CustomAxios'
import {useParams} from "react-router-dom";
// import AppBar1 from "../Theme/AppBar1";
import QuestionCard from './QuestionCard';

import { useSearchQuestions,useGetQuestions } from '../../hooks/useQuestions';

import {Toolbar, IconButton, AppBar} from "@material-ui/core";
import {Loupe, Search as SearchIcon} from "@material-ui/icons";
import InputBase from '@material-ui/core/InputBase';
import SagehBtn from "../Theme/SagehBtn";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    app_bar: {
        boxShadow: 'none'
    },

    menuButton: {
        marginLeft: theme.spacing(1),
    },
    // title: {
    //     flexGrow: 1,
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'block',
    //     },
    // },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));

function Questions() {

    let {slug , text} = useParams();
    const [search_string,setSearchString]=useState(text);
    let questions = useSearchQuestions(slug,text);

    // const questions = useGetQuestions();
    console.log('questions' , questions);
    const classes = useStyles();

    return (
        <CustomTheme>
            <div className="container-fluid ">
                <div className="row pb-2 ">
                    <div className={`${classes.root} container mt-3`}>

                        {/*<AppBar1 AppBarClassName={`mt-3`} catShow={false} title={''}/>*/}

                        <AppBar className={'mt-0  w-75'} position="sticky" top={'50px'} elevation={0} color={'transparent'}>
                            <Toolbar>


                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>

                                    </div>
                                    <InputBase
                                        placeholder="جستجو کنید…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </div>

                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <Loupe/>
                                </IconButton>

                                <SagehBtn
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                >
                                    <SearchIcon/>
                                    جستجو
                                </SagehBtn>
                                {/*<IconButton*/}
                                {/*    edge="start"*/}
                                {/*    className={classes.menuButton}*/}
                                {/*    color="inherit"*/}
                                {/*    aria-label="open drawer"*/}
                                {/*>*/}
                                {/*    <LocationOn/>*/}
                                {/*</IconButton>*/}
                                {/*<IconButton*/}
                                {/*    edge="start"*/}
                                {/*    className={classes.menuButton}*/}
                                {/*    color="inherit"*/}
                                {/*    aria-label="open drawer"*/}
                                {/*>*/}
                                {/*    <Eco/>*/}
                                {/*</IconButton>*/}
                            </Toolbar>
                        </AppBar>

                        <div className="row mt-5">


                            {
                                !questions && <Loading/>
                            }
                            <div className={`col-12`}>
                                {
                                    questions && (
                                        questions.map(question => {

                                            const child = question.best_answer ? <QuestionCard borderBottom={false}
                                                                        showBookmark={false}
                                                                        showStar={false}
                                                                        ImageSize='50px'
                                                                        content={question.content}
                                                                        user={question.user}
                                            />:'';

                                            return <QuestionCard

                                                questionId={question.id}
                                                content={question.content}
                                                user={question.user}
                                                answerCount={question.answerCount}
                                                showStar={true}
                                                star={question.best_answer!==null}
                                                pastTense={question.past_tense}
                                                created={question.created}
                                                bookmark={question.hasBookmark}
                                            >{child}</QuestionCard>
                                        })

                                    )
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </CustomTheme>
    )
}

export default Questions;