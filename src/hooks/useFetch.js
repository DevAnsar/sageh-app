import React, {useEffect, useState} from "react"
import {sagehAxios} from './../apis/CustomAxios'

export const useFetch = (url,method='get') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        sagehAxios({
            method,
            url,
        }).then(response => {
            setLoading(false);
            let {status}=response.data;
            setData(response.data);
        }).catch(err => {
            console.log(err.message)
        })
    }, [url]);

    return [loading,data];
};

