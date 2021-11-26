import React from "react"
import { ProductsContext,ProductsSetContext  } from "../providers/ProductsProvider"
import {getProductsApi} from '../apis/Products'
import { useQuery } from 'react-query';


function useProducts() {

    return React.useContext(ProductsContext);
}


function useSetProducts() {

    return React.useContext(ProductsSetContext);
}


// function useProductsActions() {
    // const setProducts = useSetProducts();
    // const products = useProducts();
    // const [loading,setLoading]=React.useState(false);
    //
    // const getProducts = slug =>{
    //     return useQuery("dd",()=>getProductsApi(slug))
    // }
    // return { getProducts , products,loading }
// }
const useGetProducts = slug =>{
    return  useQuery(['products',slug],()=>getProductsApi(slug));
}
export {useGetProducts}

