import * as yup from 'yup'
import 'core-js/stable';

export const SurveyParticipantValidationSchema = yup.object().shape({
    hasStartedWorkExperience: yup.string()
        .required("Please select if you have started your work experience")
    ,
    workExperienceStartDate: yup.date()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.date()
                .max(new Date())
                .required("Please select when you started your work experience.")
        }),
    easeOfApplicationCompletion: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please rate the ease of application completion.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    experienceOnlineApplicationComments: yup.string()
        .max(1000, "Max characters for online experience comments is 1000."),
    //step 2
    overallExperienceWithOrganization: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please rate your overall experience with your organization.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    levelOfSupportsReceived: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please rate the level of supports you received.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    increasedAbilityGettingAndKeepingJob: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please rate this experience has improved my abilities for getting and keeping a job.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    //step3
    receivedOtherWorkBCServicesOrPrograms: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please select if you have received other WorkBC Services or Programs.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    likelyToParticipateInSimilarProgram: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please select how likely are you to participate in a similar program in the future.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    likelyToRecommendGrant: yup.string()
        .when("hasStartedWorkExperience", {
            is: (value) => value === "yes",
            then: yup.string()
                .required("Please rate how likely are you to recommend this grant.")
                .oneOf([
                    '1stronglyDisagree',
                    '2disagree',
                    '3neitherAgreeNorDisagree',
                    '4agree',
                    '5stronglyAgree'
                ]),
        }),
    //step 4
    bestPartOfTheProgramComments: yup.string()
        .max(1000, "Max characters of best of part of program comments is 1000."),
    experienceBetterComments: yup.string()
        .max(1000, "Max characters to make experience better comments is 1000.")
})
