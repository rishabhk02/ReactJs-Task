import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const validateForm = (formData) => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
    }
    if (!formData.age) {
        errors.age = 'Age is required';
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
        errors.age = 'Age must be a positive number';
    }
    if (formData.hasGuest && !formData.guestName.trim()) {
        errors.guestName = 'Guest name is required';
    }
    return errors;
};

const initialState = { name: '', email: '', age: '', hasGuest: false, guestName: '' };

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setFormData(initialState);
    },[]);

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && !checked) {
            setFormData({
                ...formData,
                [name]: checked,
                ['guestName']: ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
            setFormData({ name: '', email: '', age: '', hasGuest: false, guestName: '' });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Event Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        placeholder='Enter your name'
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFieldChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFieldChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        placeholder='Enter your age'
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleFieldChange}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="hasGuest"
                        name="hasGuest"
                        checked={formData.hasGuest}
                        onChange={handleFieldChange}
                    />
                    <label className="form-check-label" htmlFor="hasGuest">Are you attending with a guest?</label>
                </div>

                {formData.hasGuest && (
                    <div className="mb-3">
                        <label htmlFor="guestName" className="form-label">Guest Name</label>
                        <input
                            type="text"
                            placeholder='Enter guest name'
                            className={`form-control ${errors.guestName ? 'is-invalid' : ''}`}
                            id="guestName"
                            name="guestName"
                            value={formData.guestName}
                            onChange={handleFieldChange}
                        />
                        {errors.guestName && <div className="invalid-feedback">{errors.guestName}</div>}
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;