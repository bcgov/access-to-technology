import * as yup from 'yup'
import "yup-phone"
import 'core-js/stable';
import moment from 'moment'


export const ProviderIntakeValidationSchema = yup.object().shape({
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
        .required('Please enter the service provider staff name'), 
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
        .min(new Date(2021,7,1), "Date must be after today")
        .max(new Date("2023-03-3"), "This is a limited time program must start before March 3 2023")
        .required("Please enter training program start date"),
    periodEnd1: yup.date()
        .min(moment(yup.ref('periodStart1')).add(28, 'days'), "Eligible programs must be at least 4 weeks in duration.")
        .max(new Date("2023-04-3"), "This is a limited time program must end before March 3 2023")
        .required("Please enter training program end date"),
    unemployed:yup.string()
        .oneOf(["yes"],"The client should be unemployed or precariously employed to be eligible for this program.")
        .required("The client should be unemployed or precariously employed to be eligible for this program."),
    BCEAorFederalOnReserve:yup.array() 
        //.oneOf(["yes"],"The client must be receiving one of the above forms of government assistance to be eligible for this program.")
        .required("The client must be receiving one of the above forms of government assistance to be eligible for this program."),
    
    // STEP 2
    
    workBCCaseNumber: yup.string().when('fundingSource', {
        is: 'SDPR',
        then: yup.string().required(
        "Please enter the clients WorkBC ES case number"),
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
        .test('match',"Client email address cannot be the same as the service provider's email address",function(clientEmail){
            return (clientEmail !== this.options.parent.serviceProviderEmail)
        }),
    clientConfirmationEmail:yup.string()
        .email("Your confirmation email address must match the client email address ")
        .required("Please enter the client confirmation email ")
        .test('match', 'The confirmation email address must match the client email address',function(clientConfirmationEmail){
            return (clientConfirmationEmail === this.options.parent.clientEmail)
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
    /*clientUnemployed:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether the client is precariously employed or unemployed"),
   registeredInApprovedProgram:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether the client is registered in an approved program"),
   accessToComputerCurrently:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether the client already has access to a suitable computer or not"),
    receivingAlternateFunding:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether client is receiving funding from another source for the purchase of the required technology"),
    financialNeed: yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether client demonstrates a financial need to take part in this program"),
    */

    //step 1:pop-up fields
    trainingProgram: yup.string()
        .required('Please select an eligible skills training program'),
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
    /*signatoryTitle: yup.string()
        .required("Please enter the title of the organization signatory.")
        .test('match','Signatories must be different',function (signatoryTitle){
            return signatoryTitle !== this.options.parent.signatory1
        }),   
    signatory1: yup.string()
        .required("Please enter the full name of the organization signatory."),
        */
    clientEligibility: yup.boolean()
        .oneOf([true],"Please attest to the clients Eligibility"),
    serviceProviderResponsibility: yup.boolean()
        .oneOf([true],"please confirm the Service Provider Responsibility"),
    /*organizationConsent: yup.boolean()
        .oneOf([true],"Required"),
        */
})