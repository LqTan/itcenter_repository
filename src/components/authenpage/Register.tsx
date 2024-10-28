import React, { useState } from 'react';
import { useUser } from '../contents/UserContext.tsx';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { register } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        const success = await register(username, password);
        if (success) {
            navigate('/login');
        } else {
            setError('Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Register</h4>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        <i className="bi bi-person-fill me-2"></i>Username
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <i className="bi bi-lock-fill me-2"></i>Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">
                                        <i className="bi bi-person-plus-fill me-2"></i>Register
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <a href="/login" className="text-decoration-none">
                                    <i className="bi bi-box-arrow-in-right me-1"></i> Already have an account? Login
                                </a>
                            </div>
                            <div className="text-center mt-4">
                                <a href="/" className="btn btn-outline-secondary">
                                    <i className="bi bi-house-door-fill me-2"></i>Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
