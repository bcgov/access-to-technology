import * as yup from 'yup'
import 'core-js/stable';

export const ParticipantValidationSchema = yup.object().shape({
    _id: yup.string()
        .required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    participantConsent: yup.boolean()
        .oneOf([true],"You must agree before submitting.")
})