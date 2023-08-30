 
import axios from 'axios';
import { useState } from 'react';

const  BASE_URL = " ";

   const getAll = async (url) => {
     return  await axios.get(BASE_URL + url);  
    }
    const create = async(url,data) => {
        return await axios.post(BASE_URL +url, data);
    }

    const getById = async(url,id)=>{
        return await axios.get(BASE_URL + url +'/' + id);
    }

    const update = async(url,data, id)=>{
        return await axios.put(BASE_URL +url+ '/' + id, data);
    }

    const remove = async(url,id)=>{
        return await axios.delete(BASE_URL + url + '/' + id);
    }
    export const ApiService = {
        getAll,
        create,
        getById,
        update,
        remove
      };


 
