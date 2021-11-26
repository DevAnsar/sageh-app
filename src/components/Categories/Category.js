import React from 'react';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Card from '@material-ui/core/Card';

import {ServerUrl} from '../../config';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
const h=()=>{
   const win_w=window.innerWidth;

    if (win_w <= 320){
        return win_w/7
    }else if (win_w > 320 && win_w <= 768){
        console.log('win-w=',win_w)
        return win_w/12
    }else if (win_w > 768 && win_w <= 1024){
        console.log('win-w=',win_w)
        return win_w/9
    }else if (win_w > 1024 ){
        console.log('win-w=',win_w)
        return win_w/9
    }

}
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 2px #417C4B',
        color: '#1c1d1c',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            boxShadow: '0 0 6px #1fa73a',
            color: '#1fa73a',

        }
    },
    col_pad: {
        paddingRight: '7px',
        paddingLeft: '7px',

    },
    media: {
        // height: 0,
        height: h,

        // paddingTop: '56.25%', // 16:9
        margin: '20px 55px 10px'

    },
    cat_img: {
        maxWidth: "100%"
    },
    titleContent: {
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    title: {
        fontSize: '0.75rem',

    }
}));


function Category({title, icon, slug}) {
    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <Col xs={4} md={3} lg={3} className={`mb-3 mb-md-4 mb-lg-5 ${classes.col_pad}`}>
            <Link to={`/products/${slug}`}>
                <Card className={classes.root}>
                    <div
                        className={` cat_img ${classes.media}`}
                        title={title}
                    >
                        <img className={` ${classes.cat_img}`} alt={title} src={`${ServerUrl}${icon}`}/>
                    </div>
                    <div className={classes.titleContent}>
                        <div className={classes.title}>
                            <span>
                            {title}
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        </Col>
    )
}

export default Category;