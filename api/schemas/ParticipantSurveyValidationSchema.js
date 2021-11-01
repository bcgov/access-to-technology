var yup = require('yup')

var ParticipantSurveyValidationSchema = yup.object().shape({
    //REQUIRED
    laptopWasNeeded: yup.string()
        .required("Please rate how essential your laptop was in completing your course.")
        .oneOf([
            '1',
            '2',
            '3',
            '4',
            '5'
        ]),
    technicalSupportSatisfaction: yup.string()
        .required("Please rate how satisfied you are with the technical support provided with the laptop.")
        .oneOf([
            '1',
            '2',
            '3',
            '4',
            '5'
        ]),

    //OPTIONAL
    hoursPerWeek: yup.string()
        .oneOf([
            '0-5',
            '6-10',
            '11-15',
            '16-20',
            '21-25',
            '26-30',
            '31-35',
            '36-40',
            '40+',
            '',
        ]),
    certificateProgram: yup.string()
        .max(200, "Max characters of what qualifications did you obtain through your skills training program is 200."),
    postTrainingPlans: yup.string()
        .oneOf([
            'Look for a job',
            'Start my own business',
            'Enroll in more training and education',
            'Volunteer',
            'Other',
            '',

        ]),
    feedBackAndExperienceComments: yup.string()
        .max(1000, "Max characters of best of part of program comments is 1000."),

})
module.exports = ParticipantSurveyValidationSchema;