import React,{useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Typical from 'react-typical'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


function Splash() {


    useEffect(()=>{


    },[]);

    return (

        <div className={`splash-box`} style={{'font-size':'15pt'}}>
            <Typical

                steps={['sageh.ir ', 1000, 'sageh.ir | ساقه ', 1500]}
                loop={false}
                wrapper="p"
            />

        </div>
    )
}

export default Splash;