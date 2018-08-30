import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './FavoriteList.css';
import BeerItem from '../../components/BeerItem/BeerItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary';
import * as actions from '../../store/actions/index';

class FavoriteList extends Component {

    componentDidMount() {
        this.props.onFetchFavorites();
    }

    beerItemClicked = (id) => {
        this.props.onSelectBeer(id);
        this.props.history.push('/fullbeerdesc');
    }

    render() {
        let beerList = <Spinner />;

        if (this.props.error) {
            beerList = <p className={classes.ErrorMsg}>Unable to load Favorites data</p>;
        } else if (!this.props.loading && this.props.favorites.length > 0) {
            beerList = this.props.favorites.map(beerItem => {
                return (
                    <BeerItem
                        key={beerItem.name}
                        id={beerItem.id}
                        imageURL={beerItem.image_url}
                        title={beerItem.name}
                        tagline={beerItem.tagline}
                        description={beerItem.description}
                        clicked={() => this.beerItemClicked(beerItem.id)} />
                );
            });
        } else if (!this.props.loading){
            beerList = <p className={classes.StandardMsg}>No favorited beers yet!</p>;
        }

        return (
            <Auxiliary>
                <div className={classes.Container}>
                    <h1>Favorited Beers</h1>
                    <hr />
                    <section className={classes.BeerItems}>
                        {beerList}
                    </section>
                </div>
            </Auxiliary>
        );
    }
}

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
        onFetchFavorites: () => dispatch(actions.fetchFavoriteBeers()),
        onSelectBeer: (id) => dispatch(actions.addBeerID(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList);