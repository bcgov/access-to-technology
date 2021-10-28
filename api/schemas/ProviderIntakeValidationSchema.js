require('core-js/stable')
var yup = require('yup')
require('yup-phone')


var ProviderIntakeValidationSchema = yup.object().shape({
     //step 1
    //see what requirements are fo APP id but it will be generated anyways
    consent: yup.boolean()
    .oneOf([true],"You must collect your clients consent form before submitting their application."),
    serviceProviderName: yup.string()
        .required('Please enter the service provider name'),
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
    BCEAorFederalOnReserve:yup.array()
        .required("The client must be receiving one of the above forms of government assistance to be eligible for this program."),
    
    // STEP 2
    
    workBCCaseNumber: yup.string().when('fundingSource', {
        is: 'SDPR',
        then: yup.string()
        .test('Is-valid-case-Number','Invalid case number, please enter in the format: 1-XXXXXX-XXXXXX or 1-XXXXXXXXXXX',
        value => (value +"").match(/^\d{1}-\d{6}-\d{6}$/gi) || (value +"").match(/^\d{1}-\d{11}$/gi) || (value +"").match(/^\d{1}-\d*$/gi) || (value +"").match(/^\d{1}-\d*-\d*$/gi))
        .required("Please use the WorkBC ES case number.  All eligible WorkBC clients must be in an approved WorkBC Service, with an ICM Case number"),
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
    recipientName:yup.string()
        .when("altShippingAddress",{
            is:true,
            then: yup.string().required("please enter the recipients name")
        }),   
    clientEligibility: yup.boolean()
        .oneOf([true],"Please attest to the clients Eligibility"),
    serviceProviderResponsibility: yup.boolean()
        .oneOf([true],"please confirm the Service Provider Responsibility"),
   
})

module.exports = ProviderIntakeValidationSchema