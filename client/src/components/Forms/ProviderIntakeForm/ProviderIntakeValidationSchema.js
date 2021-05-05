import * as yup from 'yup'
import "yup-phone"
import 'core-js/stable';


export const ProviderIntakeValidationSchema = yup.object().shape({
    //step 1
    //see what requirements are fo APP id but it will be generated anyways
    serviceProviderName: yup.string()
        .required('Please select the service provider name'),
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
    serviceProviderEmail:yup.string().email("Please enter a valid email")
        .required("Please enter the service provider email"),
    serviceProviderConfirmationEmail:yup.string()
        .email("Your confirmation email address must match the service provider email address ")
        .required("Please enter the  service provider confirmation email ")
        .test('match', 'The confirmation email address must match the  service provider address',function(serviceProviderConfirmationEmail){
            return ( serviceProviderConfirmationEmail === this.options.parent.serviceProviderEmail)
        }),
    fundingSource:yup.string()
        .oneOf(["AEST",
                "ISET",
                "SDPR"],"Please select a valid field.")
        .required('Please select your Referring Ministry'),
    periodStart1: yup.date()
        .required("Please enter your clients program start date"),
    periodEnd1: yup.date()
        .required("Please enter your clients program end date"),
    unemployed:yup.string()
        .oneOf(["yes"],"The client must be unemployed or precariously employed to be eligible for this program")
        .required("The client must be unemployed or precariously employed to be eligible for this program"),
    BCEAorFederalOnReserve:yup.array()
        //.oneOf(["yes"],"The client must be receiving one of the above forms of government assistance to be eligible for this program.")
        .required("The client must be receiving one of the above forms of government assistance to be eligible for this program"),
    
    // STEP 2
    
    workBCCaseNumber: yup.string().when('fundingSource', {
        is: 'SDPR',
        then: yup.string()
        .required(
        "Please use the WorkBC ES case number.  All eligible WorkBC clients must be in an approved WorkBC Service, with an ICM Case number"),
        otherwise: yup.string()}),
    clientName: yup.string()
        .required("Please enter client's first name"),
    clientLastName: yup.string()
        .required("Please enter client's last name"),
    clientMiddleName: yup.string(),
    clientPhone:yup.string()
        .test('Is-valid-phone','Invalid Phone Number',
        value => (value +"").match(/^\d{3}-\d{3}-\d{4}$/gi))
        .required("Please enter a valid phone number."),
    clientEmail:yup.string()
        .email("Please enter a valid email")
        .required("Please enter client email address ")
        .test('match','Client email address cannot be the same as the service provider email address',function(clientEmail){
            return (clientEmail !== this.options.parent.serviceProviderEmail)
        }),
    clientConfirmationEmail:yup.string()
        .email("Your confirmation email address must match the client email address ")
        .required("Please enter the client confirmation email address")
        .test('match', 'The confirmation email address must match the client email address',function(clientConfirmationEmail){
            return (clientConfirmationEmail === this.options.parent.clientEmail)
        }),
    clientAddress: yup.string()
        .max(255,"Address too long")
        .required("Please enter client's address"),
    clientAddress2: yup.string()
        .max(255,"Address too long"),
    clientCity:yup.string()
        .max(100,"City name too long")
        .required("Please enter client's city"),
    clientProvince:yup.string()
        .required("Please enter a valid province"),
    clientPostal:yup.string()
        .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid postal code")
        .required("Please enter a valid postal code"),
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
            then: yup.string().max(255,"Address too long, please use address line 2.").required("Please enter client's shipping address")
        }),   
    addressAlt2: yup.string()
        .max(255,"Address too long"), 
    cityAlt: yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().max(100,"City name too long").required("Please enter client's city")
        }),    
    provinceAlt:yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().required("Please enter a valid province")
        }),   
    postalAlt:yup.string()
        .when("altShippingAddress", {
            is: true,
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code").required("Please enter a valid postal code")
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
        .oneOf([true],"Please attest to the Client's Eligibility"),
    serviceProviderResponsibility: yup.boolean()
        .oneOf([true],"Please attest to the Service Provider Responsibility"),
    /*organizationConsent: yup.boolean()
        .oneOf([true],"Required"),
        */
})