import React from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';
const useStylesLoading = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: "#24d265",
        animationDuration: '700ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
    loading_height: {

    },
    loading_center: {
        minHeight: '80vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "stretch"
    }
}));

function Loading(props) {
    const loadingClasses = useStylesLoading();
    return (
        <div className={`col-12  ${loadingClasses.loading_height}`}>
            <div className={`row  ${loadingClasses.loading_center}`}>
                <div className={loadingClasses.root}>
                    <CircularProgress
                        variant="determinate"
                        className={loadingClasses.bottom}
                        size={40}
                        thickness={4}
                        {...props}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        className={loadingClasses.top}
                        classes={{
                            circle: loadingClasses.circle,
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                    />
                </div>
            </div>
        </div>
    )
}

export default Loading;