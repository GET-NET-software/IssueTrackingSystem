 
import axios from 'axios';
import { useState } from 'react';

const  BASE_URL = " ";

   const getAll = async (url) => {
     return  await axios.get(BASE_URL + 'http://localhost:5286/user/{id}');  
    }
    const create = async(url,data) => {
        return await axios.post(BASE_URL + 'http://localhost:5286/user/Register', data);
    }

    // const getById = async(url,id)=>{
    //     return await axios.get(BASE_URL + 'http://localhost:5286/dashboard/{id}' +'/' + id);
    // }

    // const update = async(url,data, id)=>{
    //     return await axios.put(BASE_URL +' http://localhost:5286/dashboard/update/{id}' + '/' + id, data);
    // }

    // const remove = async(url,id)=>{
    //     return await axios.delete(BASE_URL + 'http://localhost:5286/dashboard/remove/{id}' + '/' + id);
    // }

    export const ApiService = {
        getAll,
        create,
        // getById,
        // update,
        // remove
      };


 
