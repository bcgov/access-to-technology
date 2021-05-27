var yup = require('yup')
require('yup-phone')

var ParticipantFormValidationSchema = yup.object().shape({
    _id: yup.string()
        .required("Please enter the application ID.")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
    clientConsent: yup.boolean()
        .oneOf([true],"You must agree before submitting.")
});

module.exports = ParticipantFormValidationSchema;