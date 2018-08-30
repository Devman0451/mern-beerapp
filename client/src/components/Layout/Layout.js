import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }  

    DrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    drawerToggleHandler = () => {
        this.setState( prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <div> 
                <Toolbar drawerToggleClicked={this.drawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.DrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;