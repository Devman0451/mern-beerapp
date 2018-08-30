import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Auxiliary from '../../hoc/Auxiliary'

import classes from './FullBeerItem.css';

class FullBeerItem extends Component {

    componentDidMount() {
        const cachedBeerID = sessionStorage.getItem('beerID');
        let id = this.props.selectedBeerID ? this.props.selectedBeerID : parseInt(cachedBeerID);
        this.props.onInitSelectedBeer(id);
    }

    favoriteButtonClicked = () => {
        const favoritedBeer = {
            id: this.props.selectedBeerID,
            name: this.props.selectedBeer[0].name,
            tagline: this.props.selectedBeer[0].tagline,
            description: this.props.selectedBeer[0].description,
            image_url: this.props.selectedBeer[0].image_url,
            abv: this.props.selectedBeer[0].abv,
            ibu: this.props.selectedBeer[0].ibu
        };
        
        this.props.onFavoriteBeer(favoritedBeer);  
    }

    unfavoriteButtonClicked = (id) => {
        this.props.onUnfavoriteBeer(id);  
    }

    render() {
        let beerItem, favButton;
        let isFavorited;

        isFavorited = this.props.favorites.find( beer => beer.id === this.props.selectedBeerID);

        favButton = isFavorited ? <Button 
                        btnType="Unfavorite"
                        clicked={() => {this.unfavoriteButtonClicked(isFavorited._id)}}>Unfavorite</Button> :
                        <Button 
                                btnType="Favorite"
                                clicked={this.favoriteButtonClicked}>Favorite</Button>;

        if (this.props.loading) beerItem = <Spinner />;
        else if (this.props.error || this.props.selectedBeer === undefined || this.props.selectedBeer === null) {
            beerItem = <p className={classes.ErrorMsg}>Unable to load data from Punk API</p>;
        }
        else {
            let selectedBeer = {};
            selectedBeer = {...this.props.selectedBeer[0]};

            beerItem =
                <Auxiliary>
                    <article className={classes.BeerItem}>
                        <img src={selectedBeer.image_url} alt="beer" height="300" width="100" />
                        <div className={classes.BeerText}>
                            <h1>{selectedBeer.name}</h1>
                            <div className={classes.BeerDescription}>
                                <h5>{selectedBeer.tagline}</h5>
                                <p>{selectedBeer.description}</p>
                                <div className={classes.ExtraInfo}>
                                    <p><span>ABV: </span>{selectedBeer.abv}</p>
                                    <p><span>IBU: </span>{selectedBeer.ibu}</p>
                                </div>
                            </div>
                            <hr />
                            {favButton}
                        </div>
                    </article>
                </Auxiliary>;
            sessionStorage.setItem('beerID', this.props.selectedBeerID);
        }
        return (
            <div>
                {beerItem}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        favorites: state.beerList.favorites,
        selectedBeer: state.beerList.selectedBeer,
        selectedBeerID: state.beerList.selectedBeerID,
        loading: state.beerList.loading,
        error: state.beerList.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitSelectedBeer: (id) => dispatch(actions.initSingleBeerAPICall(id)),
        onFavoriteBeer: (favBeer) => dispatch(actions.favoriteBeer(favBeer)),
        onUnfavoriteBeer: (id) => dispatch(actions.unfavoriteBeer(id)),
        onSetFavoriteBeer: (beer) => dispatch(actions.setFavoriteBeer(beer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullBeerItem);