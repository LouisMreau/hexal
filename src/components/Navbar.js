import React, { Component } from 'react'
import {Auth} from "aws-amplify";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try{
      await Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch(error) {
      console.log(error.message);
    }
  }

  showInfo = async event => {
    event.preventDefault();
    try{
      const info = await Auth.currentSession();
      console.log(info);
    } catch(error) {
      console.log(error.message);
    }
  }

  updateScore = async event => {
    event.preventDefault();
    try{
      const attributes = [
        new CognitoUserAttribute({ Name: "custom:score", Value: "7" }),
      ];

      this.props.auth.user.updateAttributes(attributes, (err, result) => {
        if (err) console.error(err);
        console.log(result); });

    } catch(error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div>
                <a onClick={this.updateScore}  className="button is-primary">
                Show
                </a>
                
                <p>
                  Hello {this.props.auth.user.signInUserSession.idToken.payload['custom:nameIn']} 
                </p>
                </div>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                  <a href="/register" className="button is-primary">
                  <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                  Log in
                  </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/changepassword"  className="button is-primary">
                  Change password
                  </a>
                <a href="/" onClick= {this.handleLogOut} className="button is-light">
                  Log out
                  </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
