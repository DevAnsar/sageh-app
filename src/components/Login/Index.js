import React, {useState, useEffect} from 'react';
import {ExitToApp, MobileFriendly,Close as CloseIcon} from '@material-ui/icons';
import {Button, Grid, TextField, CircularProgress, Grow , Zoom ,Snackbar ,IconButton} from '@material-ui/core';

import {useLocation, useHistory} from "react-router-dom";
import useStyles from './styles';

// import useHasAuth  from './../../hooks/useAuth';
import {useHasAuth, useHasAuthActions,useAuthTokenActions,useToken} from '../../providers/AuthProvider';

import {sagehAxios} from '../../apis/CustomAxios';

import OneStep from '../../images/login/1.png'
import TwoStep from '../../images/login/2.png'
import TreeStep from '../../images/login/3.png'
import FourStep from '../../images/login/4.png'
import FiveStep from '../../images/login/5.png'

function Index() {
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();

    // const {changeHasAuth} = useHasAuthActions();
    // const has_auth = useHasAuth();
    const token = useToken();
    const {changeToken} =useAuthTokenActions();

    //1 => check mobile
    //2 => inter password for login
    //3 => inter code for login
    //4 => show not user (not find mobile in users table)
    //5 => inter code for verification mobile
    //6 =>
    const [step, setStep] = useState(1);

    const [checkLoading, setCheckLoading] = useState(false);
    const [error, setError] = useState('');

    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [verification_code, setVerificationCode] = useState('');
    const [login_code, setLoginCode] = useState('');

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (token) {
            history.push('/')
        }
        // setToken(false)
    }, []);

    let {from} = location.state || {from: {pathname: "/"}};

    const checkMobile = async (e) => {
        e.preventDefault();

        setCheckLoading(true);
        setError('');

        await sagehAxios.post(`/auth/check_mobile`, {
            mobile
        })
            .then(response => {
                console.log(response.data);
                let {status, message, has_user} = response.data;
                if (status) {

                    if (has_user) {
                        setStep(2);
                    } else {
                        setStep(4);
                    }
                } else {
                    // setError(message);
                    handleOpenAlert(message,'warning');
                }

                setCheckLoading(false);
            })
    };


    const login = async (e, c = '') => {
        e.preventDefault();
        // console.log(from);
        setCheckLoading(true);
        setError('');


        let sendData = null;
        if (c === 'code') {
            sendData = {
                mobile,
                login_code
            };

        } else {
            sendData = {
                mobile,
                password
            };
        }
        // console.log(sendData);
        await sagehAxios.post(`/auth/login`, sendData)
            .then(response => {
                console.log(response.data);
                let {status, message, access_token} = response.data;

                setCheckLoading(false);
                // setError(message);
                if (status) {
                    // console.log('changeHasAuth : true ///');
                    changeToken(access_token);
                    // changeHasAuth(true);
                    // console.log('/////////////////////////')
                    history.replace(from);
                } else {
                    setError(message);
                    // changeHasAuth(false);
                    changeToken(null);
                }

            }).catch(err => {
                // changeHasAuth(false);
                changeToken(null);
            })
    };

    const handleSendCode = async (e) => {
        e.preventDefault();

        setCheckLoading(true);
        setError('');

        await sagehAxios.post(`/auth/send_verification_code`, {
            mobile
        })
            .then(response => {

                // console.log(response.data);
                let {status, message, login_code} = response.data;
                setCheckLoading(false);
                if (status) {
                    setAlertMessage(`کد : ${login_code}`);
                    setOpenAlert(true);
                    // console.log('message response:',message)
                    setStep(3);
                } else {
                    setError(message)
                }
            })
    };

    const pre_register = async (e) => {
        e.preventDefault();

        setCheckLoading(true);
        setError('');

        await sagehAxios.post(`/auth/pre_register`, {
            mobile
        })
            .then(response => {
                console.log(response.data);
                let {status, message,register_code} = response.data;
                if (status) {
                    setAlertMessage(`کد : ${register_code}`);
                    setOpenAlert(true);
                    setStep(5);
                } else {
                    setError(message);
                }
                setCheckLoading(false);
            })
    };

    const mobile_register = async (e) => {
        e.preventDefault();

        setCheckLoading(true);
        setError('');

        await sagehAxios.post(`/auth/mobile_register`, {
            mobile,
            register_code: verification_code
        })
            .then(response => {
                console.log(response.data);
                setCheckLoading(false);
                let {status, message, access_token} = response.data;
                if (status) {
                    setError('');
                    // changeHasAuth(true);
                    changeToken(access_token);
                    // setStep(6);
                    history.replace(from);
                } else {
                    // changeHasAuth(false);
                    changeToken(null);
                    setError(message);
                }

                // setError(message);
            })
    };

    const handleOpenAlert = (message='',type='success') => {

        setAlertMessage(message);
        setOpenAlert(true);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertMessage('');
        setOpenAlert(false);
    };

    return (
        <Grid container className={classes.loginContainer} spacing={0}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center" item xs={12} lg={5} className={classes.loginItem}>


                {step === 1 && <form className={classes.root} noValidate autoComplete="off">

                    <Grid container justify="center" xs={12}>
                        <div className='text-secondary mb-3'>
                            برای بررسی و یا ورود به حساب ، شماره موبایل را وارد کنید
                        </div>
                    </Grid>

                    <Grid container justify="center" xs={12}>

                        <TextField onChange={e => setMobile(e.target.value)} align="center" id="standard-basic"
                                   label="شماره موبایل">
                        </TextField>
                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`} style={{height: '15px'}}>
                        {Error && <div className='text text-danger small'>{Error}</div>}
                    </Grid>
                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <Button
                            // fullWidth={true}
                            variant="contained"
                            color="primary"
                            type="text"
                            onClick={checkMobile}
                            // className={classes.button}
                            startIcon={checkLoading ? <CircularProgress size={20} color='#fff'/> : <ExitToApp/>}
                        >
                            بررسی و ورود
                        </Button>


                    </Grid>

                </form>}

                {step === 2 && <form className={classes.root} noValidate autoComplete="off">

                    <Grid container justify="center" xs={12}>
                        <div className='text-secondary mb-3'>
                            برای ورود به حساب<span className='mx-1 small text-sageh-1'>{mobile}</span>،رمز خود را وارد
                            کنید
                        </div>
                    </Grid>
                    <Grid container justify="center" xs={12}>

                        <TextField onChange={e => setPassword(e.target.value)} align="center"
                                   id="standard-basic" label="رمز عبور">
                        </TextField>
                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`} style={{height: '15px'}}>
                        {error && <div className='text text-danger small'>{error}</div>}
                    </Grid>
                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <Button
                            // fullWidth={true}
                            variant="contained"
                            color="primary"
                            type="text"
                            onClick={login}
                            // className={classes.button}
                            startIcon={checkLoading ? <CircularProgress size={20} color={'#fff'}/> : <ExitToApp/>}
                        >
                            ورود
                        </Button>

                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <a className='small text-info pointer' onClick={handleSendCode}>
                            ارسال کد یکبار مصرف
                        </a>

                    </Grid>

                </form>}

                {step === 3 && <form className={classes.root} noValidate autoComplete="off">

                    <Grid container justify="center" xs={12}>

                        <div className='text-secondary mb-3'>
                            کد یکبار مصرف ارسال شده به<span className='mx-1 small text-sageh-1'>{mobile}</span>را وارد
                            کنید
                        </div>
                    </Grid>

                    <Grid container justify="center" xs={12}>

                        <TextField onChange={event => setLoginCode(event.target.value)} align="center"
                                   id="standard-basic" label="کد 4 رقمی">
                        </TextField>
                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`} style={{height: '15px'}}>
                        {error && <div className='text text-danger small'>{error}</div>}
                    </Grid>
                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <Button
                            // fullWidth={true}
                            variant="contained"
                            color="primary"
                            type="text"
                            onClick={(e) => login(e, 'code')}
                            // className={classes.button}
                            startIcon={checkLoading ? <CircularProgress size={20} color={'#fff'}/> : <ExitToApp/>}
                        >
                            ورود
                        </Button>

                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <a className='small text-info pointer' onClick={(e) => {
                            e.preventDefault();
                            setStep(2);
                        }}>
                            برگشت و ورود رمز
                        </a>

                    </Grid>

                </form>}

                {step === 4 && <form className={classes.root} noValidate autoComplete="off">

                    <Grid container justify="center" xs={12}>
                        <div className='text-secondary mb-2'>
                            شما تاکنون عضو <span className='mx-1 text-sageh-1'>ساقه</span> نشده اید
                        </div>

                        <div className='text-secondary mb-3'>
                            برای تایید ثبت نام با شماره ی <span className='mx-1 small text-sageh-1'>{mobile}</span> روی
                            ثبت نام کلیک کنید

                        </div>
                    </Grid>


                    <Grid container justify="center" xs={12} className={`mt-3`} style={{height: '15px'}}>
                        {error && <div className='text text-danger small'>{error}</div>}
                    </Grid>
                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <Button
                            // fullWidth={true}
                            variant="contained"
                            color="primary"
                            type="text"
                            onClick={pre_register}
                            // className={classes.button}
                            startIcon={checkLoading ? <CircularProgress size={20} color={'#fff'}/> : <ExitToApp/>}
                        >
                            ثبت نام در ساقه
                        </Button>

                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <a className='small text-info pointer' onClick={(e) => {
                            e.preventDefault();
                            setMobile('');
                            setStep(1);
                        }}>
                            ورود با شماره جدید
                        </a>

                    </Grid>

                </form>}

                {step === 5 && <form className={classes.root} noValidate autoComplete="off">

                    <Grid container justify="center" xs={12}>

                        <div className='text-secondary mb-3'>
                            کد یکبار مصرف ارسال شده به<span className='mx-1 small text-sageh-1'>{mobile}</span>را وارد
                            کنید
                        </div>
                    </Grid>

                    <Grid container justify="center" xs={12}>

                        <TextField onChange={event => setVerificationCode(event.target.value)} align="center"
                                   id="standard-basic" label="کد 5 رقمی">
                        </TextField>
                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`} style={{height: '15px'}}>
                        {error && <div className='text text-danger small'>{error}</div>}
                    </Grid>
                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <Button
                            // fullWidth={true}
                            variant="contained"
                            color="primary"
                            type="text"
                            onClick={mobile_register}
                            // className={classes.button}
                            startIcon={checkLoading ? <CircularProgress size={20} color={'#fff'}/> : <MobileFriendly/>}
                        >
                            تایید شماره موبایل
                        </Button>

                    </Grid>

                    <Grid container justify="center" xs={12} className={`mt-3`}>
                        <a className='small text-info pointer' onClick={(e) => {
                            e.preventDefault();
                            setError('');
                            setStep(1);
                        }}>
                            ورود مجدد
                        </a>

                    </Grid>

                </form>}

            </Grid>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center" item xs={false} lg={7}
                  className={`${classes.loginImageContainer} ,${classes.loginItem}`}>
                <Grid container justify="center" spacing={0}>

                    <Grow in={step === 1} className={classes.loginImage}>
                        <Grid container justify="center" xs={12} >
                            <img className={classes.loginLeftImage} src={OneStep}/>
                        </Grid>
                    </Grow>

                    <Zoom  in={step === 2} className={classes.loginImage}>
                        <Grid container justify="center" xs={12}>
                            <img className={classes.loginLeftImage} src={TwoStep}/>
                        </Grid>
                    </Zoom>


                    <Grow in={step === 3 } className={classes.loginImage}>
                        <Grid container justify="center" xs={12}>
                            <img className={classes.loginLeftImage} src={TreeStep}/>
                        </Grid>
                    </Grow>

                    <Grow in={step === 4} className={classes.loginImage} >
                        <Grid container justify="center" xs={12}>
                            <img className={classes.loginLeftImage} src={FourStep}/>
                        </Grid>
                    </Grow>


                    <Grow in={step === 5} className={classes.loginImage} >
                        <Grid container justify="center" xs={12}>
                            <img className={classes.loginLeftImage} src={FiveStep}/>
                        </Grid>
                    </Grow>

                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message={alertMessage}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleCloseAlert}>
                            برگشت
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAlert}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />

        </Grid>
    )
}

export default Index;