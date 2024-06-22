import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { ApiContext } from '../Context/Apicontext';
import { useNavigate } from 'react-router-dom';

const surveyTopicOption = [{
    label: 'Select a topic',
    value: '',
}, {
    label: 'Technology',
    value: 'Technology',
}, {
    label: 'Health',
    value: 'Health',
}, {
    label: 'Education',
    value: 'Education',
}];

const programmingOption = [{
    label: 'Select a language',
    value: '',
}, {
    label: 'JavaScript',
    value: 'JavaScript',
}, {
    label: 'Python',
    value: 'Python',
}, {
    label: 'Java',
    value: 'Java',
}, {
    label: 'C#',
    value: 'C#',
}];

const exFreqOption = [{
    label: 'Select frequency',
    value: '',
}, {
    label: 'Daily',
    value: 'Daily',
}, {
    label: 'Weekly',
    value: 'Weekly',
}, {
    label: 'Monthly',
    value: 'Monthly',
}, {
    label: 'Rarely',
    value: 'Rarely',
}];

const dietPrefOption = [{
    label: 'Select preference',
    value: '',
}, {
    label: 'Vegetarian',
    value: 'Vegetarian',
}, {
    label: 'Vegan',
    value: 'Vegan',
}, {
    label: 'Non-Vegetarian',
    value: 'Non-Vegetarian',
}];

const educOption = [{
    label: 'Select qualification',
    value: '',
}, {
    label: 'High School',
    value: 'High School'
}, {
    label: `Bachelor's`,
    value: `Bachelor's`
}, {
    label: `Master's`,
    value: `Master's`
},
{
    label: `PhD`,
    value: `PhD`
}];

const validateForm = (formData) => {
    let errors = {};
    if (!formData?.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData?.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!formData?.surveyTopic?.value) errors.surveyTopic = 'Survey Topic is required';
    if (formData?.surveyTopic?.value === 'Technology') {
        if (!formData?.programmingLanguage?.value) errors.programmingLanguage = 'Programming Language is required';
        if (!formData?.yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
    }
    if (formData.surveyTopic?.value === 'Health') {
        if (!formData.exerciseFrequency?.value) errors.exerciseFrequency = 'Exercise Frequency is required';
        if (!formData.dietPreference?.value) errors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic?.value === 'Education') {
        if (!formData.highestQualification?.value) errors.highestQualification = 'Highest Qualification is required';
        if (!formData.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback) {
        errors.feedback = 'Feedback is required';
    } else if (formData.feedback.length < 50) {
        errors.feedback = 'Feedback must be at least 50 characters';
    }
    return errors;
};

const initialState = {
    fullName: '',
    email: '',
    surveyTopic: '',
    programmingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
};

const SurveyForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchQuestions } = useContext(ApiContext);

    useEffect(() => {
        setFormData(initialState);
    }, []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            submitForm();
        }
    };

    const submitForm = async () => {
        try {
            setIsSubmitting(true);
            const questions = await fetchQuestions(formData.surveyTopic?.value);
            setAdditionalQuestions(questions);
            alert(JSON.stringify({ ...formData, additionalQuestions: questions }, null, 2));
            setFormData(initialState);
        } catch (error) {
            console.error('Error fetching additional questions:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2>Survey Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                            type="text"
                            placeholder='Enter Full Name'
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFieldChange}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFieldChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="surveyTopic" className="form-label">Survey Topic</label>
                        <Select
                            className={`${errors.surveyTopic ? 'is-invalid' : ''}`}
                            id="surveyTopic"
                            name="surveyTopic"
                            value={formData.surveyTopic}
                            options={surveyTopicOption}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    ['surveyTopic']: e,
                                    ['programmingLanguage']: null,
                                    ['yearsOfExperience']: '',
                                    ['exerciseFrequency']: null,
                                    ['dietPreference']: null,
                                    ['highestQualification']: null,
                                    ['fieldOfStudy']: ''
                                }));
                            }}
                        />
                        {errors.surveyTopic && <div className="invalid-feedback">{errors.surveyTopic}</div>}
                    </div>

                    {formData?.surveyTopic?.value === 'Technology' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="programmingLanguage" className="form-label">Favorite Programming Language</label>
                                <Select
                                    className={`${errors.programmingLanguage ? 'is-invalid' : ''}`}
                                    id="programmingLanguage"
                                    name="programmingLanguage"
                                    value={formData.programmingLanguage}
                                    options={programmingOption}
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        ['programmingLanguage']: e
                                    }))}
                                />
                                {errors.programmingLanguage && <div className="invalid-feedback">{errors.programmingLanguage}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
                                <input
                                    type="number"
                                    placeholder='Enter Years of Experience'
                                    className={`form-control ${errors.yearsOfExperience ? 'is-invalid' : ''}`}
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleFieldChange}
                                />
                                {errors.yearsOfExperience && <div className="invalid-feedback">{errors.yearsOfExperience}</div>}
                            </div>
                        </>
                    )}

                    {formData?.surveyTopic?.value === 'Health' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="exerciseFrequency" className="form-label">Exercise Frequency</label>
                                <Select
                                    className={`${errors.exerciseFrequency ? 'is-invalid' : ''}`}
                                    id="exerciseFrequency"
                                    name="exerciseFrequency"
                                    value={formData.exerciseFrequency}
                                    options={exFreqOption}
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        ['exerciseFrequency']: e
                                    }))}
                                />
                                {errors.exerciseFrequency && <div className="invalid-feedback">{errors.exerciseFrequency}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dietPreference" className="form-label">Diet Preference</label>
                                <Select
                                    className={`${errors.dietPreference ? 'is-invalid' : ''}`}
                                    id="dietPreference"
                                    name="dietPreference"
                                    value={formData.dietPreference}
                                    options={dietPrefOption}
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        ['dietPreference']: e
                                    }))}
                                />
                                {errors.dietPreference && <div className="invalid-feedback">{errors.dietPreference}</div>}
                            </div>
                        </>
                    )}

                    {formData?.surveyTopic?.value === 'Education' && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="highestQualification" className="form-label">Highest Qualification</label>
                                <Select
                                    className={`${errors.highestQualification ? 'is-invalid' : ''}`}
                                    id="highestQualification"
                                    name="highestQualification"
                                    value={formData.highestQualification}
                                    options={educOption}
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        ['highestQualification']: e
                                    }))}
                                />
                                {errors.highestQualification && <div className="invalid-feedback">{errors.highestQualification}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="fieldOfStudy" className="form-label">Field of Study</label>
                                <input
                                    type="text"
                                    placeholder='Enter Field of Study'
                                    className={`form-control ${errors.fieldOfStudy ? 'is-invalid' : ''}`}
                                    id="fieldOfStudy"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleFieldChange}
                                />
                                {errors.fieldOfStudy && <div className="invalid-feedback">{errors.fieldOfStudy}</div>}
                            </div>
                        </>
                    )}

                    <div className="mb-3">
                        <label htmlFor="feedback" className="form-label">Feedback</label>
                        <textarea
                            className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                            placeholder='Enter Feedback'
                            id="feedback"
                            name="feedback"
                            rows="3"
                            value={formData.feedback}
                            onChange={handleFieldChange}
                        ></textarea>
                        {errors.feedback && <div className="invalid-feedback">{errors.feedback}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button className="btn btn-primary mx-2" onClick={()=> navigate(-1)}>Go Back</button>
                </form>

                {additionalQuestions.length > 0 && (
                    <div className="mt-4">
                        <h3>Additional Questions:</h3>
                        <ul>
                            {additionalQuestions?.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SurveyForm;