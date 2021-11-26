import React from "react";
import {sagehAxios} from './CustomAxios';

const getProductsApi =async(slug)=>{
     const {data}=await  sagehAxios({method: 'get', url: `/getProducts?category_slug=${slug}`});

     return data;
};

export {getProductsApi}