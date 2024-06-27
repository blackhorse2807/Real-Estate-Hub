import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
    'x-rapidapi-key': 'aa5e77b2bdmsh00e002ce2197c79p143bd0jsna0a0687a1eea',
    'x-rapidapi-host': 'bayut.p.rapidapi.com'
    },
  });
    
  return data;
}