import React from 'react';
import { NavLink } from 'react-router-dom';

import './link.css';
import classes from './BeerItem.css';

const beerItem = (props) => {
    let description;

    if(props.description.length > 60) description = `${props.description.slice(0, 60)}...`;

    return (
            <article className={classes.BeerItem} onClick={props.clicked}>
                <img src={props.imageURL} alt="beer" height="60" width="20"/>
                <div>
                    <h1>{props.title}</h1>
                    <div className={classes.BeerDescription}>
                        <h5>{props.tagline}</h5>
                        <p>{description ? description : props.description}</p>
                    </div>
                </div>
            </article>
    );
};

export default beerItem;