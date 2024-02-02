import axios from "axios";

const apiUrl = 'https://localhost:7098/api/Movie';

export const searchMovie = async (title) => {
    const response = await fetch(`${apiUrl}/search?title=${title}`);
    const data = await response.json();
    return data;
};

export const getMovieDetails = async (imdbId) => {
    const response = await fetch(`${apiUrl}/${imdbId}`);
    const data = await response.json();
    return data;
};

export const getHistory = async () => {
    const response = await axios.get(`${apiUrl}/history`);
    const data = await response.json();
    return data;
};
