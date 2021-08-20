import * as yup from 'yup'
import 'core-js/stable';

export const EmploymentValidationSchema = yup.object().shape({
    _id: yup.string()
        .required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    _token:yup.string().required("Please enter the application token.")
        .min(25, "Must be 25 characters")
        .max(25, "Must be 25 characters"),
    employmentFound: yup.string()
        .required("Please indicate whether your client has found a position."),
    employmentStatus: yup.string()
        .when("employmentFound", {
            is: (value) => value === "no",
            then: yup.string()
                .required("Please indicate what your client is currently pursuing")
        }),
    clientSignature: yup.string()
        .required('Please select the service provider name'),
    clientConsent: yup.boolean()
        .oneOf([true],"You must agree before submitting."),
    clientConsentDate: yup.date()
        .required("Please enter the date of consent")
})