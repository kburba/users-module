import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';
import { Container } from '@material-ui/core';

class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = '/login';
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const guestList = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        const authenticatedList = (
            <ul className="navbar-nav ml-auto">
                <img
                    src={user.avatar}
                    title={user.name}
                    className="rounded-circle"
                    style={{ height: '40px', width: '40px', marginRight: '15px' }}
                    alt={user.name}
                />
                <li className="nav-item">
                    <span className="nav-link" onClick={this.onLogoutClick}>
                        Logout
                    </span>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <Container style={{ display: 'flex' }}>
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">
                                    Orders
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/clients">
                                    Clients
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">
                                    Services
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/languages">
                                    Languages
                                </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authenticatedList : guestList}
                    </div>
                </Container>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
