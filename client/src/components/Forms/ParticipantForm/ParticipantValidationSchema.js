import * as yup from 'yup'
import 'core-js/stable';

export const ParticipantValidationSchema = yup.object().shape({
    _id: yup.string()
        .required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    _token:yup.string().required("Please enter the application token.")
    .min(25, "Must be 25 characters")
    .max(25, "Must be 25 characters"),
    clientName: yup.string().required('Please enter your first name'),
    clientLastName: yup.string().required('Please enter your last name'),
    clientSignature: yup.string()
        .required('Please enter your full name'),
    clientConsent: yup.boolean()
        .oneOf([true],"You must agree before submitting."),
    clientConsentDate: yup.date()
        .required("Please enter the date of consent")
})