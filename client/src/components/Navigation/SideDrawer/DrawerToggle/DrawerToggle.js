import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.MobileOnly} onClick={props.clicked}>
        <div className={classes.bar1}/>
        <div className={classes.bar2}/>
        <div className={classes.bar3}/>
    </div>
);

export default drawerToggle;