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
        .required('Please enter the service provider contract reference ID name'),
    serviceProviderPostal:yup.string()
        .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code")
        .required("Please enter a valid Postal Code"),   
    serviceProviderContact: yup.string()
        .required('Please enter the service provider contact name'), 
    serviceProviderPhone:yup.string()
        .test('Is-valid-phone','Invalid phone',
        value => (value +"").match(/^\d{3}-\d{3}-\d{4}$/gi))
        .required("Please enter phone."),
    serviceProviderEmail:yup.string().email("Please enter a valid email.")
        .required("Please enter email"),
    fundingSource:yup.string()
        .oneOf(["AEST",
                "ISET",
                "SDPR"],"Please select a valid field.")
        .required('Please select your funding source.'),
    periodStart1: yup.date()
        .min(new Date(), "Date must be after today")
        .required("Please Enter your clients program start date"),
    periodEnd1: yup.date()
        .min(moment(yup.ref('periodStart1')).add(28, 'days'), "Eligible programs must be at least 4 weeks in duration.")
        .max(new Date("2022-03-31"), "This is a limited time program must end before March 31 2022")
        .required("Please Enter your clients program end date"),
    BCEAorFederalOnReserve:yup.string()
        .oneOf(["yes"],"The client must be either BCEA or Federal On Reserve to be eligible for this program.")
        .required("The client must be either BCEA or Federal On Reserve to be eligible for this program."),
    
    // STEP 2
    workBCCaseNumber: yup.string().when('fundingSource', {
        is: 'SDPR',
        then: yup.string().test('valid','Please enter the clients WorkBC case number in format: XXX-XXX-XXXX',
        value => (value + "").match(/^\w{3}-\w{3}-\w{4}$/gi))
        .required(
        "Please use the WorkBC case number format: XXX-XXX-XXXX.  All eligible WorkBC clients must be in an approved WorkBC Service, with an ICM Case number."),
        otherwise: yup.string()}),
    clientName: yup.string()
        .required('Please enter the clients name'),
    clientPhone:yup.string()
        .test('Is-valid-phone','Invalid phone',
        value => (value +"").match(/^\d{3}-\d{3}-\d{4}$/gi))
        .required("Please enter phone."),
    clientEmail:yup.string().email("Please enter a valid email.")
        .required("Please enter email"),
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
    telusInternetForGood:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether the client is eligible for Telus internet for good."),
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
       .oneOf(["Skills Training","Essential Skills Training","Pre-Apprenticeship Training" ,"Skills Training for Employment", "ITA Funded Pre-Apprenticeship Training","Indigenous Employment and Skills Training","Blade Runners","Short Duration Training","Occupational Skills Training","BC Adult Graduation Diploma"],"Please select an eligible training program"),
    addressAlt:yup.string()
        .when("altShippingAddress",{
            is:true,
            then: yup.string().max(255,"Address too long, please use address line 2.").required("please enter your other work address")
        }),    
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