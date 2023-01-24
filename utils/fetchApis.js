import axios from "axios";

export const baseURL = 'https://bayut.p.rapidapi.com'

export const fetchAPI = async (url) => {
   const {data} = await axios.get((url), {
    headers: {
        'X-RapidAPI-Key': 'a8342f1bf5msh4d163ce93af06f7p1109bajsn13911abcf453',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    },
   });
   return data;
}




 