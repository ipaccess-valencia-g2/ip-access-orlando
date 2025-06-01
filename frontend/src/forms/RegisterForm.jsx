import React, { useState } from 'react';
import { Button, ButtonRadio, ButtonToggle } from '../components/common';
import { Field, FieldLarge, FieldNumber } from '../components/common/';
import { PickerDate, PickerDrop } from '../components/common/';

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

    // Phone format
    const phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number (123) 456-7890.";
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

    const formatPhoneNumber = (val) => {
      const digits = val.replace(/\D/g, "").slice(0, 10);
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
      return val;
    };

    const formatZip = (val) => {
      const digits = val.replace(/\D/g, "");
      return digits.slice(0, 5);
    };

    let updatedValue = value;

    if (name === "phone") {
      updatedValue = formatPhoneNumber(value);
    }

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

      const response = await fetch('http://localhost:3000/register', { // TODO: Update with deployed backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: fullAddress,
          phone: formData.phone
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
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Register</h2>

      {/* First Name */}
      <div>
        <label className="block font-medium" htmlFor="firstName">First Name:</label>
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
      <div>
        <label className="block font-medium" htmlFor="lastName">Last Name:</label>
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
      <div>
        <label className="block font-medium" htmlFor="dob">Date of Birth:</label>
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
      <div>
        <label className="block font-medium" htmlFor="street">Street Address:</label>
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
      <div>
        <label className="block font-medium" htmlFor="unit">Unit/Apt (if applicable):</label>
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
      <div>
        <label className="block font-medium" htmlFor="city">City:</label>
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
      <div>
        <label className="block font-medium" htmlFor="state">State:</label>
        <input
          id="state"
          name="state"
          value="Florida (FL)"
          disabled
          className="w-full border p-2 rounded bg-gray-200"
        />
      </div>

      {/* ZIP Code */}
      <div>
        <label className="block font-medium" htmlFor="zip">ZIP Code:</label>
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
      <div>
        <label className="block font-medium" htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="(123) 456-7890"
          maxLength="14"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium" htmlFor="email">Email:</label>
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
      <div>
        <label className="block font-medium" htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Choose a username (3-20 chars)"
          minLength="3"
          maxLength="20"
          pattern="[a-zA-Z0-9]+"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium" htmlFor="password">Password:</label>
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
      <div>
        <label className="block font-medium" htmlFor="confirmPassword">Confirm Password:</label>
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