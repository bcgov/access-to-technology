import * as yup from 'yup'
import 'core-js/stable';

export const SendConsentValidationSchema = yup.object().shape({
    _id: yup.string().required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    _token:yup.string().required("Please enter the application token.")
    .min(25, "Must be 25 characters")
    .max(25, "Must be 25 characters"),
    serviceProviderName: yup.string()
    .required('Please select the service provider name'),
    serviceProviderEmail:yup.string().email("Please enter a valid email")
        .required("Please enter the service provider email"),
    serviceProviderConfirmationEmail:yup.string()
        .email("Your confirmation email address must match the service provider email address ")
        .required("Please enter the  service provider confirmation email ")
        .test('match', 'The confirmation email address must match the  service provider address',function(serviceProviderConfirmationEmail){
            return ( serviceProviderConfirmationEmail === this.options.parent.serviceProviderEmail)
        }),
    clientEmail:yup.string().email("Please enter a valid email")
        .required("Please enter client email address "),
    fundingSource:yup.string()
        .oneOf(["AEST",
                "ISET",
                "SDPR"],"Please select a valid field.")
        .required('Please select Referring Ministry'),
})