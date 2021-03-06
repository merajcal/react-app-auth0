import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
    login = () => this.props.auth.login();

    logout = () => this.props.auth.logout();

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    !isAuthenticated() && (
                        <div className="container column">
                            <h5>ReactiveSearch Auth0 Example</h5>
                            <h5>
                                You are not logged in! Please{' '}
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.login}
                                >
                                    Log In
                </a>
                                {' '}to continue.
              </h5>
                            <h6>This is the default <b><code>Home</code></b> component. The <b><code>App</code></b> component will only be visible once you authenticate.</h6>
                        </div>
                    )
                    
                }

                {
                    isAuthenticated() && (
                        <Redirect to={{ pathname: '/dashboard' }} />
                    )
                }
            </div>
        )
    }

}

export default Home;