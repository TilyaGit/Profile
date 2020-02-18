import React from 'react';
import './App.css';
import {Home} from './components/Home'
import {Navigation} from './components/Navigation'
import {Profile} from './components/Profile'



import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      
      <h5 className="m-3 d-flex justify-content-center">
      Profiles Management Portal</h5>

      <Navigation/>

      <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/profile' component={Profile}/>

      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
