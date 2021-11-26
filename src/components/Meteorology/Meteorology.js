import React, {useEffect, useState} from "react";
import CustomTheme from "../Theme/Theme";
import axios from "axios";
import {colorTxt1, weatherApiKey, weatherApiUrl} from '../../config'
import SagehBtn from "../Theme/SagehBtn";
import {Button, Grid, IconButton, Snackbar} from "@material-ui/core";
import {Close as CloseIcon} from "@material-ui/icons";
import cityTimezones from 'city-timezones';

import moment from 'moment';


function Meteorology() {

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('تهران');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [lat, setLatitude] = useState(null);
    const [lon, setLongitude] = useState(null);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetcher = (url) => {
        return axios.post(url)
    }

    // const {data, error} = useSWR(`https://api.apieco.ir/apitalk/google-weather/`, fetcher);

    useEffect(async () => {

        getWeather('ارومیه');

    }, []);

    function getWeather(city) {
        // setLoading(true);
        setCity(city);

        // navigator.geolocation.watchPosition(position=>{
        //     console.log("position is :", position);
        //     console.log("Latitude is :", position.coords.latitude);
        //     console.log("Longitude is :", position.coords.longitude); 
        // })

        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                console.log("position: ", position);


                setError(false);


                axios.get(`${weatherApiUrl}/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly&lang=fa&appid=${weatherApiKey}`).then(res => {

                    console.log(res);
                    setWeather(res.data);
                    // console.log(res.data.timezone)
                    // const c=cityTimezones.lookupViaCity(res.data.timezone);
                    // console.log(c)
                    setCity(res.data.timezone);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                    setError(true);
                });


            }, error => {
                console.log('error: ', error)
                if (error.code === 2) {

                    handleOpenAlert('اتصال اینترنت برقرار نیست!')

                }
            });
        } else {
            console.log("Not Available");
        }


    }

    const description = () => {
        return weather ? weather.list[0].weather[0]?.description : '';
    }
    const get_icon = (path) => {
        return weather ? `http://openweathermap.org/img/wn/${path}@2x.png` : false;
    }

    const handleOpenAlert = (message = '', type = 'success') => {

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

        <CustomTheme>
            <div className="container-fluid ">
                <div className="col-12 pb-3 pt-2">

                    <div className="center-align justify-center mt-5">
                        <span>
                            {` وضعیت آب و هوای شهر ${city} `}

                        </span>
                    </div>
                    <div className="center-align justify-center mt-5">
                        <div className='column-space-between align-center'>
                            <img src={get_icon(weather?.current.weather[0].icon)}></img>
                            <span>{weather?.current.weather[0].description}</span>
                            <span>{moment.unix(weather?.current.dt).format('DD/MM/YYYY')}</span>
                            <div className='space-between'>
                                <span>

                                    {`C  دمای هوا:`}

                                    {
                                        (weather?.current.temp / 10).toFixed(1)
                                    }

                                </span>
                            </div>
                            <span>
                                uvi:
                                {
                                    weather?.current.uvi
                                }
                            </span>
                        </div>
                    </div>

                    <div className="center-align justify-center mt-5 ">
                        <div className='row-wrap'>
                            {
                                weather?.daily.map((day, index) => {
                                    if (index !== 0) {
                                        return (
                                            <div>
                                                <div className='column-space-between px-3 align-center mb-4'>
                                                    <img style={{width: '60px'}}
                                                         src={get_icon(day.weather[0].icon)}></img>
                                                    <span className='title-xx-small'>{day.weather[0].description}</span>
                                                    <span
                                                        className='title-xx-small'>{moment.unix(day.dt).format('DD/MM/YYYY')}</span>
                                                    <div className='space-between'>
                                <span>

                                    دمای هوا:
                                    {
                                        (day.temp.eve / 10).toFixed(1)
                                    }

                                </span>
                                                    </div>
                                                    <span>
                                uvi:
                                                        {
                                                            day.uvi
                                                        }
                            </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>

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
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </CustomTheme>
    )
}

export default Meteorology;