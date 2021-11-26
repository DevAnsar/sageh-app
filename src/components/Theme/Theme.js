import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navigation from './Navigation/Navigation';
import Footer from './Footer';
const useStyles = makeStyles(() => ({
    app: {
        fontSize: '14px',
        backgroundColor:'#f7f7f7',
        minHeight:'100vh'
    },
}));

function Theme({children,nav=true,footer=true}) {
    const classes = useStyles({

    });

    // console.log("<Theme /> rendered");
    return (
        <div id="app">
            {
                nav && <Navigation/>
            }

            <div className='scaffold '>
                {children}
            </div>
            {
                footer && <Footer/>
            }
        </div>
    )
}

export default Theme;