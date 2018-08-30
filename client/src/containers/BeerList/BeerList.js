import React, { Component } from 'react';
import { connect } from 'react-redux';

import BeerItem from '../../components/BeerItem/BeerItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

import classes from './BeerList.css';

class BeerList extends Component {
    state = {
        searchTerm: ""
    }

    componentDidMount() {
        this.props.onInitBeerList();
    }

    searchHandler = (event) => {
        event.preventDefault();
        let searchText = this.state.searchTerm;
        this.setState( {searchTerm: ""} );
        let safeString = searchText.replace(/[^\w\s]/gi, '').replace(" ", "_").toLowerCase();
        this.props.onInitBeerSearch(safeString);
    }

    beerItemClicked = (id) => {
        this.props.onSelectBeer(id);
        this.props.history.push('/fullbeerdesc');
    }

    inputChangedHandler = (event) => {
        this.setState( {searchTerm: event.target.value} )
    }

    render() {
        let beerItems;
        if (!this.props.error && !this.props.loading) {
            beerItems = this.props.beerItems.map(beerItem => {
                return (
                    <BeerItem
                        key={beerItem.name}
                        id={beerItem.id}
                        imageURL={beerItem.image_url}
                        title={beerItem.name}
                        tagline={beerItem.tagline}
                        description={beerItem.description} 
                        clicked={() => this.beerItemClicked(beerItem.id)}/>
                );
            });
        } else if (this.props.error) {
            beerItems = <p className={classes.ErrorMsg}>Unable to load data from Punk API</p>;
        } else {
            beerItems = <Spinner />;
        }


        return (
            <div>
                <form onSubmit={this.searchHandler} className={classes.SearchBar}>
                    <Input
                        elementType="input"
                        placeholderText="Search for a beer..."
                        changed={this.inputChangedHandler} 
                        value={this.state.searchTerm}/>
                    <Button 
                        btnType="Primary"
                        disabled={this.state.searchTerm.length > 0 ? false : true}>Search</Button>
                </form>
                <section className={classes.BeerItems}>
                    {beerItems}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        beerItems: state.beerList.beerItems,
        favorites: state.beerList.favorites,
        selectedBeerID: state.beerList.selectedBeerID,
        loading: state.beerList.loading,
        error: state.beerList.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitBeerList: () => dispatch(actions.initBeerAPICall()),
        onSelectBeer: (id) => dispatch(actions.addBeerID(id)),
        onInitBeerSearch: (beerName) => dispatch(actions.initBeerSearch(beerName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);