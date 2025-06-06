import React, { useState } from 'react';
import { Button, ButtonRadio, ButtonToggle } from '../components/common';
import { Field, FieldLarge, FieldNumber } from '../components/common/';
import { PickerDate, PickerDrop } from '../components/common/';
import '../pages/styles/RegisterPage.css';

const isOrlandoAddress = (city) => {
  return city.trim().toLowerCase() === 'orlando';
};

const calculateAge = (dob) => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    street: '',
    unit: '',
    city: '',
    zip: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    if (!formData.street.trim()) newErrors.street = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (formData.username && !usernameRegex.test(formData.username)) {
      newErrors.username = "Username must be 3-20 alphanumeric characters.";
    }

    // Age validation
    const age = calculateAge(formData.dob);
    if (formData.dob && age < 18) {
      newErrors.dob = "You must be 18 or older to register.";
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // ZIP code format
    const zipRegex = /^\d{5}$/;
    if (formData.zip && !zipRegex.test(formData.zip)) {
      newErrors.zip = "ZIP code must be exactly 5 digits.";
    }

    // City validation
    if (!isOrlandoAddress(formData.city)) {
      newErrors.city = "Only City of Orlando residents may register.";
    }

    // Password validation
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formatZip = (val) => {
      const digits = val.replace(/\D/g, "");
      return digits.slice(0, 5);
    };

    let updatedValue = value;

    if (name === "zip") {
      updatedValue = formatZip(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const fullAddress = `${formData.street}${formData.unit ? `, ${formData.unit}` : ''}, ${formData.city}, FL ${formData.zip}`;

      const response = await fetch('http://localhost:3307/register', { // TODO: Update with deployed backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: fullAddress,
          phone: formData.phone,
          dob: formData.dob
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccessMessage('Registration successful! You can now log in.');
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '',
        unit: '',
        city: '',
        zip: '',
      });
    } catch (err) {
      setErrors(prev => ({ ...prev, form: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate dates for DOB field
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="text-xl font-bold">Register</h2>

      {/* First Name */}
      <div class="regfl">
        <label  htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Enter your first name"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div class="regfl">
        <label  htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Enter your last name"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>

      {/* DOB */}
      <div class="regfl">
        <label  htmlFor="dob">Date of Birth:</label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          max={maxDateString}
          min={minDateString}
        />
        {errors.dob && <p className="text-red-500">{errors.dob}</p>}
      </div>

      {/* Street Address */}
      <div class="regfl">
        <label  htmlFor="street">Street Address:</label>
        <input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="123 Main St"
        />
        {errors.street && <p className="text-red-500">{errors.street}</p>}
      </div>

      {/* Unit */}
      <div class="regfl">
        <label  htmlFor="unit">Unit/Apt (if applicable):</label>
        <input
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Apt 4B"
        />
      </div>

      {/* City */}
      <div class="regfl">
        <label  htmlFor="city">City:</label>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="ex. Orlando"
        />
        {errors.city && <p className="text-red-500">{errors.city}</p>}
      </div>

      {/* State */}
      <div class="regfl">
        <label  htmlFor="state">State:</label>
        <input
          id="state"
          name="state"
          value="Florida (FL)"
          disabled
          className="state-d"
        />
      </div>

      {/* ZIP Code */}
      <div class="regfl">
        <label  htmlFor="zip">ZIP Code:</label>
        <input
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="ex. 32801"
        />
        {errors.zip && <p className="text-red-500">{errors.zip}</p>}
      </div>

      {/* Phone */}
      <div class="regfl">
        <label  htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="1234567890"
          maxLength="14"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div class="regfl">
        <label  htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Username Field */}
      <div class="regfl">
        <label  htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Choose a username"
          minLength="3"
          maxLength="20"
          pattern="[a-zA-Z0-9]+"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      {/* Password */}
      <div class="regfl">
        <label  htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Enter a password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div class="regfl">
        <label  htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>

      {/* Form-level messages */}
      {errors.form && <p className="text-red-500">{errors.form}</p>}
      {successMessage && (
        <div className="p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;