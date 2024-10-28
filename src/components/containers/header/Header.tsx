import React, { useState } from 'react';
import '../../../styles/Header.css';
import { useUser } from '../../contents/UserContext';

const Header: React.FC = () => {
    const { user, logout } = useUser();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="py-3 bg-light shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <div className="header-logo">
                    <a href="/">
                        <img
                            src="https://via.placeholder.com/100x40"
                            alt="Logo"
                            className="img-fluid"
                        />
                    </a>
                </div>

                {/* Search Bar */}
                <div className="header-search w-50">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control border-end-0"
                            placeholder="Search courses"
                            aria-label="Search"
                            aria-describedby="search-icon"
                        />
                        <span
                            className="input-group-text bg-white border-start-0 border-1"
                            id="search-icon"
                        >
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>

                {/* Account & Cart */}
                <div className="header-account d-flex align-items-center">
                    <div className="me-3">
                        <a href="/cart" className="text-dark text-decoration-none">
                            <i className="bi bi-cart3"></i> Cart
                        </a>
                    </div>
                    <div className="position-relative">
                        {user ? (
                            <div className="dropdown">
                                <button
                                    className="btn btn-light d-flex align-items-center"
                                    onClick={handleDropdownToggle}
                                >
                                    <i className="bi bi-person"></i>
                                    <span className="ms-2">{user.username}</span>
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </button>
                                {showDropdown && (
                                    <ul className="dropdown-menu dropdown-menu-end show">
                                        <li>
                                            <a href="/profile" className="dropdown-item">
                                                <i className="bi bi-person-circle me-2"></i> Xem hồ sơ
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/schedule" className="dropdown-item">
                                                <i className="bi bi-calendar-event me-2"></i> Lịch học
                                            </a>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={logout}
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className="text-dark text-decoration-none">
                                <i className="bi bi-person"></i> Đăng nhập
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
