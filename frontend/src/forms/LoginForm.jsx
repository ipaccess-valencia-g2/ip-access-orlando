import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/LoginPage.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage('');

        try {
            const response = await fetch(`http://3.15.153.52:3307/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // important for cookie
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save user ID to local storage
            localStorage.setItem('userID', data.userID);

            console.log("Logged in userID:", data.userID);
            setSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/dashboard'), 1000); // redirect after short delay

        } catch (err) {
            setErrors(prev => ({ ...prev, form: err.message }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md login-card">
            <h2 className="login-title">Login to Continue</h2>

            {/* Username */}
            <div>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control custom-input mb-3"
                    placeholder="Enter your username"
                    required
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="position-relative">
                <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control custom-input mb-3"
                    placeholder="Enter your password"
                    required
                />
                <span
                    className="toggle-password"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? '🙈' : '👁️'}
                </span>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            {/* Form-level error */}
            {errors.form && <p className="text-red-500">{errors.form}</p>}

            {/* Success message */}
            {successMessage && (
                <div className="p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`btn custom-login-btn w-100 mb-3 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
