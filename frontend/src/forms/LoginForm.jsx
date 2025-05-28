import React, { useState } from 'react';

const LoginForm = () => {

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    // State to manage error messages
    const [errors, setErrors] = useState({});

    // State to indicate if the form is being submitted
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to display a success message
    const [successMessage, setSuccessMessage] = useState('');

    // Validation function to check form input
    const validate = () => {
        const newErrors = {};

        // Check if username/email was entered
        if (!formData.usernameOrEmail.trim()) {
            newErrors.usernameOrEmail = "Username or email is required.";
        }

        // Check if password was entered
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        // Save validation errors
        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle typing into input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding state field
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        // Run validation
        if (!validate()) return;

        // Begin submitting
        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage('');

        try {
            // Send POST request to backend login endpoint
            const response = await fetch('http://localhost:3000/login', { // TODO: Update URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: formData.usernameOrEmail,  // Backend should accept either username or email
                    password: formData.password,
                }),
            });

            const data = await response.json();

            // If response not OK, throw an error
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Show success message
            setSuccessMessage('Login successful!');

            // Reset form
            setFormData({
                usernameOrEmail: '',
                password: '',
            });
        } catch (err) {
            // Show any errors that occurred
            setErrors((prev) => ({ ...prev, form: err.message }));
        } finally {
            // Stop submitting
            setIsSubmitting(false);
        }
    };

    // JSX to render the login form
    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md">
            <h2 className="text-xl font-bold">Login</h2>

            {/* Username or Email Field */}
            <div>
                <label className="block font-medium" htmlFor="usernameOrEmail">Username or Email: </label>
                <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                    placeholder="Enter your username or email"
                />
                {/* Error message for username/email */}
                {errors.usernameOrEmail && <p className="text-red-500">{errors.usernameOrEmail}</p>}
            </div>

            {/* Password Field */}
            <div>
                <label className="block font-medium" htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                    placeholder="Enter your password"
                />
                {/* Error message for password */}
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            {/* Form-level error message */}
            {errors.form && <p className="text-red-500">{errors.form}</p>}

            {/* Success message */}
            {successMessage && (
                <div className="p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-2 rounded ${
                    isSubmitting
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
