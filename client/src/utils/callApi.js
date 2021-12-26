import axios from "axios";
import * as conFig from '../store/constants/conFig'

export default function callApi(endpoint, method = 'GET', data, headers)
{
    return  axios({
                method : method,
                url : `${conFig.API_URL}/${endpoint}`,
                data : data,
                headers : headers
            }).catch(err => {
                console.log(err);
            })
}