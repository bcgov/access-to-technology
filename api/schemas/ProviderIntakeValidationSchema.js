require('core-js/stable')
var yup = require('yup')
require('yup-phone')


var ProviderIntakeValidationSchema = yup.object().shape({
     //step 1
    //see what requirements are fo APP id but it will be generated anyways
    serviceProviderName: yup.string()
        .required('Please enter the service provider name'),
    providerContractId: yup.string()
        .required('Please enter the service provider contract reference ID'),
    serviceProviderPostal:yup.string()
        .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code")
        .required("Please enter a valid Postal Code"),   
    serviceProviderContact: yup.string()
        .required('Please enter the service provider contact name'), 
    serviceProviderPhone:yup.string()
        .test('Is-valid-phone','Invalid Phone Number',
        value => (value +"").match(/^\d{3}-\d{3}-\d{4}$/gi))
        .required("Please enter a valid phone number."),
    serviceProviderEmail:yup.string().email("Please enter a valid email.")
        .required("Please enter email"),
    fundingSource:yup.string()
        .oneOf(["AEST",
                "ISET",
                "SDPR"],"Please select a valid field.")
        .required('Please select your Referring Ministry.'),
    periodStart1: yup.date()
        .required("Please Enter your clients program start date"),
    periodEnd1: yup.date()
        .required("Please Enter your clients program end date"),
    unemployed:yup.string()
        .oneOf(["yes"],"The client should be unemployed or precariously employed to be eligible for this program.")
        .required("The client should be unemployed or precariously employed to be eligible for this program."),
    BCEAorFederalOnReserve:yup.array()
        .required("The client must be receiving one of the above forms of government assistance to be eligible for this program."),
    
    // STEP 2
    
    workBCCaseNumber: yup.string().when('fundingSource', {
        is: 'SDPR',
        then: yup.string()
        .required(
        "Please use the WorkBC ES case number.  All eligible WorkBC clients must be in an approved WorkBC Service, with an ICM Case number."),
        otherwise: yup.string()}),
    clientName: yup.string()
        .required('Please enter the clients First name'),
    clientLastName: yup.string()
        .required('Please enter the clients Last name'),
    clientMiddleName: yup.string(),
    clientPhone:yup.string()
        .test('Is-valid-phone','Invalid Phone Number',
        value => (value +"").match(/^\d{3}-\d{3}-\d{4}$/gi))
        .required("Please enter a valid phone number."),
    clientEmail:yup.string()
        .email("Please enter a valid email. ")
        .required("Please enter email ")
        .test('match','client email address cannot be the same as the service providers email address',function(clientEmail){
            return (clientEmail !== this.options.parent.serviceProviderEmail)
        }),
    clientAddress: yup.string()
        .max(255,"Address too long")
        .required("please enter your clients address"),
    clientAddress2: yup.string()
        .max(255,"Address too long"),
    clientCity:yup.string()
        .max(100,"City name too long")
        .required("please enter your clients city"),
    clientProvince:yup.string()
        .required("Please enter a valid province"),
    clientPostal:yup.string()
        .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code")
        .required("Please enter a valid Postal Code"),
    altShippingAddress: yup.boolean(),
    //step 1:pop-up fields
    trainingProgram: yup.string()
        .required('Please select a an eligible training program'),
        //.oneOf(["Skills Training","Essential Skills Training","Pre-Apprenticeship Training" ,"Skills Training for Employment", "ITA Funded Pre-Apprenticeship Training","Indigenous Employment and Skills Training","Blade Runners","Short Duration Training","Occupational Skills Training","BC Adult Graduation Diploma"],"Please select an eligible training program"),
    addressAlt:yup.string()
        .when("altShippingAddress",{
            is:true,
            then: yup.string().max(255,"Address too long, please use address line 2.").required("please enter your other work address")
        }),   
    addressAlt2: yup.string()
        .max(255,"Address too long"), 
    cityAlt: yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().max(100,"City name too long").required("Please enter a city")
        }),    
    provinceAlt:yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().required("Please enter a province")
        }),   
    postalAlt:yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code").required("Please enter a postal code.")
        }),  
    clientEligibility: yup.boolean()
        .oneOf([true],"Please attest to the clients Eligibility"),
    serviceProviderResponsibility: yup.boolean()
        .oneOf([true],"please confirm the Service Provider Responsibility"),
    /*organizationConsent: yup.boolean()
        .oneOf([true],"Required"),
        */
})

module.exports = ProviderIntakeValidationSchema