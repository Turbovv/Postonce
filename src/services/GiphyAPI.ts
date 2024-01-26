import axios from 'axios'

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

const baseUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key='

export default {
    getGiphyData(searchQuery: string) {
        return axios.get(`${baseUrl}${apiKey}&q=${searchQuery}`)
    }
}

