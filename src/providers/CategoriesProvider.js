import React, {useEffect, useState} from 'react';
import {sagehAxios} from "../apis/CustomAxios";

export const CategoriesContext = React.createContext();
export const CategoriesContextLoading = React.createContext();


function CategoriesProvider({children}) {


    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        sagehAxios({method: 'get', url: '/getCategories'}).then(response => {
            setLoading(false);
            let {status} = response.data;
            setCategories(response.data);
        }).catch(err => {
            console.log(err.message)
        })
    }, []);

    console.log("<CategoriesProvider /> rendered. categories:", categories);
    return (

            <CategoriesContext.Provider value={categories}>
                <CategoriesContextLoading.Provider value={loading}>
                    {children}
                </CategoriesContextLoading.Provider>
            </CategoriesContext.Provider>

    );


}
export default CategoriesProvider;