import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './components/Main';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import Default from './components/Default';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/posts/new" component={CreatePost} />
                    <Route exact path="/posts/:id" component={PostDetails} />
                    <Route component={Default} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
