import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-international-phone/style.css';
import { useNavigate } from 'react-router-dom';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const validateForm = (formData) => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone Number is required';
    } else if (!isPhoneValid(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if(!formData?.position?.value){
        errors.position = 'Please select postion your are applying'
    }
    if (['Developer', 'Designer'].includes(formData.position?.value) && (!formData.relevantExperience || Number(formData.relevantExperience) <= 0)) {
        errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (formData.position?.value === 'Designer' && !formData.portfolioURL.trim()) {
        errors.portfolioURL = 'Portfolio URL is required for Designers';
    } else if (formData.position?.value === 'Designer' && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL)) {
        errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (formData.position?.value === 'Manager' && !formData.managementExperience.trim()) {
        errors.managementExperience = 'Management Experience is required for Managers';
    }
    if (Object.values(formData.additionalSkills).filter(Boolean).length === 0) {
        errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.interviewTime) {
        errors.interviewTime = 'Preferred Interview Time is required';
    }
    return errors;
};

const initialState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
        JavaScript: false,
        CSS: false,
        Python: false,
        React: false,
        Node: false
    },
    interviewTime: ''
};

const postionOptions = [{
    label: 'Select a position',
    value: '',
}, {
    label: 'Developer',
    value: 'Developer',
}, {
    label: 'Designer',
    value: 'Designer',
}, {
    label: 'Manager',
    value: 'Manager',
}];

const JobApplicationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        setFormData(initialState);
    },[]);

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                additionalSkills: {
                    ...prev.additionalSkills,
                    [name]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
            setFormData(initialState);
        }
    };

    const getFormatedDateTime = ()=>{
        const now = new Date();
    
        // Format the date and time to 'YYYY-MM-DDTHH:MM' which is required by the 'datetime-local' input
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
    
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDateTime;
    }

    return (
        <div className="container mt-5">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        placeholder='Enter Full Name'
                        className={`form-control ${errors?.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        name="fullName"
                        value={formData?.fullName}
                        onChange={handleFieldChange}
                    />
                    {errors?.fullName && <div className="invalid-feedback">{errors?.fullName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleFieldChange}
                    />
                    {errors?.email && <div className="invalid-feedback">{errors?.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <PhoneInput
                        className={`${errors?.phoneNumber ? 'is-invalid' : ''}`}
                        defaultCountry="in"
                        value={formData?.phoneNumber}
                        onChange={(value) => setFormData((prevData)=>({
                            ...prevData,
                            ['phoneNumber']: value
                        }))}
                        inputStyle={{width: '100%'}}
                    />
                    {errors?.phoneNumber && <div className="invalid-feedback">{errors?.phoneNumber}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Applying for Position</label>
                    <Select
                        className={`${errors?.position ? 'is-invalid' : ''}`}
                        id="position"
                        name="position"
                        placeholder='Select Position'
                        value={formData?.position}
                        onChange={(e) => setFormData((prevData) => ({
                            ...prevData,
                            ['position']: e,
                            ['relevantExperience']: '',
                            ['portfolioURL']: '',
                            ['managementExperience']: ''
                        }))}
                        options={postionOptions}
                    >
                    </Select>
                    {errors?.position && <div className="invalid-feedback">{errors?.position}</div>}
                </div>

                {['Developer', 'Designer'].includes(formData?.position?.value) && (
                    <div className="mb-3">
                        <label htmlFor="relevantExperience" className="form-label">Relevant Experience (years)</label>
                        <input
                            type="number"
                            placeholder='Enter Relevant Experience'
                            className={`form-control ${errors?.relevantExperience ? 'is-invalid' : ''}`}
                            id="relevantExperience"
                            name="relevantExperience"
                            value={formData?.relevantExperience}
                            onChange={handleFieldChange}
                        />
                        {errors?.relevantExperience && <div className="invalid-feedback">{errors?.relevantExperience}</div>}
                    </div>
                )}

                {formData?.position?.value === 'Designer' && (
                    <div className="mb-3">
                        <label htmlFor="portfolioURL" className="form-label">Portfolio URL</label>
                        <input
                            type="url"
                            placeholder='Enter Portfolio Url'
                            className={`form-control ${errors?.portfolioURL ? 'is-invalid' : ''}`}
                            id="portfolioURL"
                            name="portfolioURL"
                            value={formData?.portfolioURL}
                            onChange={handleFieldChange}
                        />
                        {errors?.portfolioURL && <div className="invalid-feedback">{errors?.portfolioURL}</div>}
                    </div>
                )}

                {formData?.position?.value === 'Manager' && (
                    <div className="mb-3">
                        <label htmlFor="managementExperience" className="form-label">Management Experience</label>
                        <textarea
                            className={`form-control ${errors.managementExperience ? 'is-invalid' : ''}`}
                            placeholder='Enter Management Experience'
                            id="managementExperience"
                            name="managementExperience"
                            value={formData?.managementExperience}
                            onChange={handleFieldChange}
                        />
                        {errors.managementExperience && <div className="invalid-feedback">{errors.managementExperience}</div>}
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Additional Skills</label>
                    {formData?.additionalSkills && Object.keys(formData.additionalSkills).map((skill) => (
                        <div className="form-check" key={skill}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={skill}
                                name={skill}
                                checked={formData.additionalSkills[skill]}
                                onChange={handleFieldChange}
                            />
                            <label className="form-check-label" htmlFor={skill}>
                                {skill}
                            </label>
                        </div>
                    ))}
                    {errors.additionalSkills && <div className="text-danger">{errors.additionalSkills}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="interviewTime" className="form-label">Preferred Interview Time</label>
                    <input
                        type="datetime-local"
                        className={`form-control ${errors.interviewTime ? 'is-invalid' : ''}`}
                        id="interviewTime"
                        name="interviewTime"
                        value={formData.interviewTime}
                        onChange={handleFieldChange}
                        min={getFormatedDateTime()}
                    />
                    {errors.interviewTime && <div className="invalid-feedback">{errors.interviewTime}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-primary mx-2" onClick={()=> navigate(-1)}>Go Back</button>
            </form>
        </div>
    );
};

export default JobApplicationForm;