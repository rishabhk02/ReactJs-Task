import React from "react";
import { ApiContext } from "../Context/Apicontext";
import SurveyForm from "./SurveyForm";

const Level3 = () => {
    const fetchQuestions = async (topic) => {
        try {
            /*const response = await axios.get(`/externalQuestion/${topic}`);
            if (response.status === 200) {
                return response.data.questions;
            }*/
            switch (topic) {
                case 'Technology':
                    return ['How many industry experience you have ?', 'What is you tech stack ?'];
                case 'Health':
                    return ['How to maintain healthy life styles ?', 'What is your diet plan ?'];
                case 'Education':
                    return ['What is your highest qualification ?', 'What is your year of graduation ?'];
                default: return [];
            }
        } catch (error) {
            console.error(error);
        }
        return [];
    };

    return (
        <ApiContext.Provider value={{ fetchQuestions }}>
            <SurveyForm />
        </ApiContext.Provider>
    )
}

export default Level3;  