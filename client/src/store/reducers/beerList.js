import * as actionTypes from '../actions/actionTypes';

const initialstate = {
    beerItems: [],
    favorites: [],
    selectedBeer: null,
    selectedBeerID: null,
    loading: true,
    error: false
};

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BEERS:
            return {
                ...state,
                beerItems: action.beerItems,
                loading: false,
                error: false
            };
        case actionTypes.FETCH_BEERS_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        case actionTypes.FETCH_FULL_BEER:
            return {
                ...state,
                selectedBeer: action.beerItem,
                selectedBeerID: action.id,
                loading: false,
                error: false
            };
        case actionTypes.REMOVE_FULL_BEER:
            return {
                ...state,
                selectedBeer: action.beerItem
            };
        case actionTypes.ADD_BEER_ID:
            return {
                ...state,
                selectedBeerID: action.id,
                loading: true,
                error: false
            };
        case actionTypes.FAVORITE_BEER:
            return {
                ...state,
                favorites: [action.favBeer, ...state.favorites]
            };
        case actionTypes.UNFAVORITE_BEER:
            return {
                ...state,
                favorites: state.favorites.filter(beer => beer._id !== action.id)
            };
        case actionTypes.SET_FAVORITE_BEER:
            return {
                ...state,
                selectedBeer: action.beer
            };
        case actionTypes.FETCH_FAVORITES_START:
            return {
                ...state,
                loading: true,
                error: false
            };
        case actionTypes.FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                favorites: action.favorites,
                loading: false
            };
        case actionTypes.FETCH_FAVORITES_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;