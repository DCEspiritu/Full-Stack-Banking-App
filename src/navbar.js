import React from 'react';
import { useUser } from './userContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg bg-secondary">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#" title="Home Page">GoodBank</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#/CreateAccount/" title="Create Account page">Create Account</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#/Login/" title="Login page">Login</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#/deposit/" title="Deposit page">Deposit</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#/withdraw/" title="Withdraw page">Withdraw</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-bold" href="#/alldata/" title="All Data page">All Data</a>
                                </li>
                            </>
                        )}
                    </ul>
                    {user && (
                        <ul className="navbar-nav ms-auto">
                          <li className="nav-item">
                            <div className="navbar-text">
                              Welcome, {user.name || user.email}
                            </div>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link fw-bold" href="#" onClick={handleLogout}>Logout</a>
                        </li>
                      </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
