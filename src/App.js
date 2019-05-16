import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Redirect, Prompt } from 'react-router-dom';
import './index.css'

const Home = () => {
    return (
        <h2>Welcome home</h2>
    );
};

const Topics = () => {
    return (

        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <NavLink to='/topics/html'>HTML</NavLink>
                </li>
                <li>
                    <NavLink to='/topics/css'>CSS</NavLink>
                </li>
                <li>
                    <NavLink to='/topics/js'>JS</NavLink>
                </li>

            </ul>

            <Route
            path='/topics/html'
            component={HTML}
            ></Route>

            <Route
            path='/topics/css'
            component={CSS}
            ></Route>

            <Route
            path='/topics/js'
            component={JS}
            ></Route>

        </div>

    );
};

const HTML = () => {
    return (
        <div>
            <h3>Learn HTML</h3>
        </div>
    );
};

const CSS = () => {
    return (
        <div>
            <h3>Learn CSS</h3>
        </div>
    );
};

const JS = () => {
    return (
        <div>
            <h3>Learn JS</h3>
        </div>
    );
};


const User = (props) => {

    return (
        <div>
            <h2>Welcome {props.username}</h2>
        </div>
    );
};


class App extends Component {

    state = {
        isLoggedIn: false,
    };

    handleLogin = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        })
    };

    render() {
        
        const { isLoggedIn } = this.state;
        const status = isLoggedIn ? 'Logged in' : 'Logged out';

        return (
            <BrowserRouter>

                <nav>
                    <NavLink exact to='/' activeStyle={{background: 'lightyellow'}}>Home</NavLink>
                    <br />
                    <NavLink to='/contact'>Contact</NavLink>
                    <br />
                    <NavLink to='/topics'>Topics</NavLink>
                    <br />
                    <NavLink to='/user/Xurxe'>User</NavLink>
                </nav>

                <h1>
                    React Router Lesson
                </h1>

                <button onClick={this.handleLogin}>{status}</button>

                <Route 
                exact path='/' 
                component = {
                    Home
                }
                ></Route>

                <Route 
                path='/contact' 
                render = {
                    () => <h2>Contact me</h2>
                }
                ></Route>

                <Route 
                path='/topics' 
                component = { (props) => {
                    return isLoggedIn 
                    ? <Topics {...props}></Topics>
                    : <Redirect to='/'></Redirect>
                }}
                ></Route>

                <Route 
                path='/user/:username' 
                component = { (props) => {
                    return isLoggedIn 
                    ? <User username = {props.match.params.username}></User> 
                    : <Redirect to='/'></Redirect>
                }}
                ></Route>

                <Prompt 
                when= {!isLoggedIn} 
                message={(location) => {
                    if (location.pathname.startsWith('/topics')) {
                        return 'This is a premium section'
                    } 
                }}
                ></Prompt>

                    
            
            </BrowserRouter>
        );
    };
};

export default App;
