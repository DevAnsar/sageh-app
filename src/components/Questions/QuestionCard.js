import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {color1, userName, colorTxt2, colorTxt1, colorDark1, colorYellow1} from '../../config'
import {TurnedInNot, TurnedIn, StarBorder, Star} from '@material-ui/icons';
import NotFindUserImage from "../Icons/user_avatar.jpg";
import SagehBtn from "../Theme/SagehBtn";
import {IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useAddBookmark,useRemoveBookmark} from '../../hooks/useQuestions'


function QuestionCard( {
                          slug = '#',
                          children,
                          showBookmark = true,
                          bookmark = false,
                          showStar = false,
                          star = false,
                          borderBottom = true,
                          ImageSize = '60px',

                          content = '',
                          user = {name: '', family: ''},
                          answerCount = 0,
                          questionId = 0,
                          pastTense = '',
                          created = '',

                      }) {

    const [addBookmarkMutation] = useAddBookmark();
    const [removeBookmarkMutation] = useRemoveBookmark();
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
            overflow: 'hidden',
            color: colorTxt2
        },
        time: {
            color: colorTxt2
        },
        cover: {
            width: 151,
        },
        starButton: {
            color: colorYellow1
        },
        bookmarkButton: {
            color: colorDark1
        }
    }));
    const classes = useStyles();


    const setBookmark = (e) => {
        e.preventDefault();
        console.log('questionId :' ,questionId)
        addBookmarkMutation(questionId);

    }
    const deleteBookmark = (e) => {
        e.preventDefault();
        console.log('questionId :' ,questionId)
        removeBookmarkMutation(questionId);
    }

    return (

        <div className={`container pb-3 pt-3 mb-3 ${borderBottom ? 'border-bottom' : ''}`}>
            <Link to={'/faq/' + questionId}>
                <div className={`row `}>
                    <div className='col-2 col-lg-1 center-align'>
                        <Link to={`/user/${user.id}`}>
                            <SagehBtn
                                Width={ImageSize}
                                Height={ImageSize}
                                BorderRadius={'50%'}
                                Border='3px solid #eee'
                                styles={{padding: '0'}}
                            >
                                <img className='w-100' alt={''}
                                     src={NotFindUserImage}/>
                            </SagehBtn>
                        </Link>
                    </div>
                    <div className='col-8 col-lg-9 center-align'>
                        <Link to={`/user/${user.id}`}>
                                            <span className={`title-middle2 ml-2 ${classes.title}`}>
                                                {userName(user)}
                                            </span>

                        </Link>

                        <span className={`title-x-small mr-3 ${classes.time}`}>
                                                {created}
                                            </span>

                        <span className={`title-x-small mr-2 ${classes.time}`}>
                                                {pastTense}
                                            </span>
                    </div>
                    <div className='col-2 col-lg-2 center-align justify-end'>

                        {showStar && (
                            <IconButton
                                edge="start"
                                className={classes.starButton}
                                aria-label="open drawer"
                            >
                                {
                                    star && (<Star/>)
                                }
                            </IconButton>
                        )}

                        {
                            answerCount !== 0 ? <span style={{color: colorTxt2}} className={` title-small ml-3`}>
                            {answerCount}
                                پاسخ
                        </span> : ''
                        }
                        {
                            showBookmark && (<IconButton
                                edge="start"
                                className={classes.bookmarkButton}
                                color="inherit"
                                aria-label="open drawer"

                            >
                                {bookmark ? <TurnedIn onClick={(e)=>deleteBookmark(e)}/> :
                                    <TurnedInNot onClick={(e)=>setBookmark(e)}/>}
                            </IconButton>)
                        }


                    </div>
                </div>
                <div className={`row`}>
                    <div className='col-2 col-lg-1'/>
                    <div className={`col-8 col-lg-9`} style={{color: colorTxt1}}>
                        {content}
                    </div>
                    <div className={`col-2 col-lg-2`}/>
                </div>
                <div className={`row`}>
                    {children}
                </div>
            </Link>
        </div>

    )
}

export default QuestionCard;