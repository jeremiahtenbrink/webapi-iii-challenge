import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MainView from './views/MainView';
import UserView from './views/UserView';

import './App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={MainView}/>
                <Route path={'/users/:id'} component={UserView}/>
            </Switch>
        );
    }
}

export default App;
