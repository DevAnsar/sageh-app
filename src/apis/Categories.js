

import {sagehAxios} from './CustomAxios';

const getAllCategories =async()=>{
    return sagehAxios({method: 'get', url: '/getCategories'})
};

export {getAllCategories}