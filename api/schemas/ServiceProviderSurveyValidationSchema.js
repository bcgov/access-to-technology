require('core-js/stable')
var yup = require('yup')

var ServiceProviderSurveyValidationSchema = yup.object().shape({
    easeOfApplicationCompletion: yup.string()
    .required("Please rate how easy the application process was to complete.")
    .oneOf([
        '1',
        '2',
        '3',
        '4',
        '5'
    ]),
applicationProcessingSpeed: yup.string()
    .when("cohort", {
        is: (value) => value === 1,
        then: yup.string()
            .required("Please rate how satisfied you are with the speed in which application(s) were processed.")
            .oneOf([
                '1',
                '2',
                '3',
                '4',
                '5'
            ])
    }),
otherTrainingProgramsSuggestions: yup.string()
    .max(200, "Max characters of the other training programs suggestions field is 200."),
overallExperienceWithOnlineApplicationProcess: yup.string()
    .max(1000, "Max characters of other comments on your experience with the application process is 1000."),
programsSupportOfClient: yup.string()
    .required("Please rate how significant the A2T program is to your clients training completion.")
    .oneOf([
        '1',
        '2',
        '3',
        '4',
        '5'
    ]),
likelyToRecommendProgram: yup.string()
    .required("Please rate how likely your organization is to recommend the A2T program to other organizations.")
    .oneOf([
        '1',
        '2',
        '3',
        '4',
        '5'
    ]),
experienceBetterComments: yup.string()
    .max(1000, "Max characters of your program experience comments is 1000.")
})

module.exports = ServiceProviderSurveyValidationSchema;