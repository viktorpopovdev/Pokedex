import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getPokemons() {
  try {
    const response = await apiService.get();
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPokemonInfo(name) {
  try {
    const response = await apiService.get(`${name}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMorePokemons(offset) {
  try {
    const response = await apiService.get(`?offset=${offset}&limit=20`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPokemonDetailsById(id) {
  try {
    const response = await apiService.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
