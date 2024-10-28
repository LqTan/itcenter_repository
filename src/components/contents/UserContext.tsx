// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../mock_data/mockUsers';
import {jwtDecode} from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>; // Đổi email thành username
    register: (username: string, password: string, avatarFile?: File) => Promise<boolean>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:3001/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }) // Gửi username thay vì email
            });

            if (!response.ok) {
                console.error('Login failed');
                return false;
            }

            const data = await response.json();
            const { token } = data;

            if (token) {
                sessionStorage.setItem('token', token);
                const decoded: any = jwtDecode(token);
                const loggedInUser: User = { id: decoded.id, username: username, password: password };
                sessionStorage.setItem('user', JSON.stringify(loggedInUser));
                setUser(loggedInUser);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    };

    const register = async (username: string, password: string, avatarFile?: File): Promise<boolean> => {
        const formData = new FormData();
        const id_account = uuidv4();
        formData.append('id_account', id_account);
        formData.append('username', username);
        formData.append('password', password);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const response = await fetch('http://localhost:3001/accounts', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                console.error('Registration failed huhu');
                return false;
            }

            return await login(username, password);
        } catch (error) {
            console.error('Error during registration:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};
