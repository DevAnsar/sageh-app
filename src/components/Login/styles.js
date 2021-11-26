import {makeStyles} from '@material-ui/core';

export default makeStyles((theme) => ({
    root: {

        flexGrow: 1,
    },
    loginContainer: {
        flex: 1,
        height: "100vh",
        textAlign: 'center',
    },
    loginItem: {
        flex: 1,
        height: "100vh",
        textAlign: 'center',
        justifyContent: 'center',
    },
    loginImageContainer: {
        background: 'linear-gradient(0deg, rgba(36,210,101,1) 0%, rgb(173 253 204) 100%)',
        position: 'relative',
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'nowrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'stretch',
    },
    // button:{
    //     backgroundColor:'rgb(36,210,101)',
    // },
    loginImage: {
        top:'calc(50vh - 100px)',
        position: 'absolute',
    },
    loginLeftImage: {
        width: '200px',


    }

}));