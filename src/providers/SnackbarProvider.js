import React, {useState,createContext,useEffect} from 'react';
import {Snackbar} from "@material-ui/core";

export const AlertOpen = createContext(true);
export const AlertMessage = createContext('گفتگوی آنلاین در حال توسعه میباشد.');

function SnackbarProvider({children}) {

    const [open, setOpen] = useState();
    const [message, setMessage] = useState();

    useEffect(()=>{

    },[])
    return (
        <>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={() => {}}
                message={(
                    <span>{message}</span>
                )}
                action={
                    <React.Fragment>

                    </React.Fragment>
                }
            />

        </>
    )
}

export default SnackbarProvider;