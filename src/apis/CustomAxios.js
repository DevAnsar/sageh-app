import axios from "axios";
import {ServerUrl,NodeServerUrl} from '../config';


const sagehAxios = axios.create({
    baseURL: `${ServerUrl}/api/v1`,
    headers: {'Accept': 'application/json'}
});

const sagehNodeServerAxios = axios.create({
    baseURL: `${NodeServerUrl}`,
    headers: {'Accept': 'application/json'}
});
export {sagehAxios,sagehNodeServerAxios};