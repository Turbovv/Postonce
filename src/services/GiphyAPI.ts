import axios from 'axios'

const apiKey = 'j8xGCQElHY1xbE64wNZUoVeMohcYRwb8';

const baseUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key='

export default {
    getGiphyData(searchQuery: string) {
        return axios.get(`${baseUrl}${apiKey}&q=${searchQuery}`)
    }
}

