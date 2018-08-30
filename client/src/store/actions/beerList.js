import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBeers = (beerItems) => {
    return {
        type: actionTypes.FETCH_BEERS,
        beerItems
    };
};

export const fetchBeersFailed = () => {
    return {
        type: actionTypes.FETCH_BEERS_FAILED
    };
};

export const initBeerAPICall = () => {
    return dispatch => {
        axios.get('https://api.punkapi.com/v2/beers')
            .then(res => {
                dispatch(fetchBeers(res.data));
            }).catch(err => {
                dispatch(fetchBeersFailed());
            });
    };
};

export const fetchFullBeer = (beerItem, id) => {
    return {
        type: actionTypes.FETCH_FULL_BEER,
        beerItem,
        id
    };
};

export const removeFullBeer = () => {
    return {
        type: actionTypes.REMOVE_FULL_BEER
    };
};

export const initSingleBeerAPICall = (id) => {
    return dispatch => {
        axios.get('https://api.punkapi.com/v2/beers?ids=' + id)
            .then(res => {
                dispatch(fetchFullBeer(res.data, id));
            }).catch(err => {
                dispatch(fetchBeersFailed());
            });
    };
};

export const addBeerID = (id) => {
    return {
        type: actionTypes.ADD_BEER_ID,
        id
    };
};

export const favoriteBeer = (favBeer) => {
    return dispatch => {
        axios.post('/api/beeritems', favBeer)
            .then(res => {
                dispatch({
                    type: actionTypes.FAVORITE_BEER,
                    favBeer: res.data
                })
            })
    };
};

export const unfavoriteBeer = (id) => {
    return dispatch => {
        axios.delete(`/api/beeritems/${id}`)
            .then(res =>
                dispatch({
                    type: actionTypes.UNFAVORITE_BEER,
                    id
                })
            );
    }
};

export const setFavoriteBeer = (beer) => {
    return {
        type: actionTypes.SET_FAVORITE_BEER,
        beer
    };
};

export const fetchFavoriteBeersStart = () => {
    return {
        type: actionTypes.FETCH_FAVORITES_START
    };
};

export const fetchFavoriteBeersSuccess = (favorites) => {
    return {
        type: actionTypes.FETCH_FAVORITES_SUCCESS,
        favorites
    };
};

export const fetchFavoritesFail = (err) => {
    return {
        type: actionTypes.FETCH_FAVORITES_FAIL,
        err
    };
};

export const fetchFavoriteBeers = () => {
    return dispatch => {
        dispatch(fetchFavoriteBeersStart());
        axios.get('/api/beeritems')
            .then(res => {
                const fetchedFavorites = [];
                for (let key in res.data) {
                    fetchedFavorites.push({
                        ...res.data[key]
                    });
                }
                dispatch(fetchFavoriteBeersSuccess(fetchedFavorites));
            })
            .catch(err => {
                dispatch(fetchFavoritesFail(err));
            })
    };
};


export const initBeerSearch = (beerName) => {
    return dispatch => {
        axios.get('https://api.punkapi.com/v2/beers?beer_name=' + beerName)
            .then(res => {
                dispatch(fetchBeers(res.data));
            }).catch(err => {
                dispatch(fetchBeersFailed());
            });
    };
};