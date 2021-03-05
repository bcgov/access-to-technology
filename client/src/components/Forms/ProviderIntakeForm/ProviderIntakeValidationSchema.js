import * as yup from 'yup'
import "yup-phone"
import 'core-js/stable';


export const ProviderIntakeValidationSchema = yup.object().shape({
    //step 1
    //see what requirements are fo APP id but it will be genereated anyways
    applicationId: yup.string()
        .matches(/^[0-9]{9}[A-Z]{2}[0-9]{4}$/gi,"Number is Incorrect should be in the form: 123456789BC0001 ")
        .max(15, "Business number must be exactly 15 characters")
        .min(15, "Business number must be exactly 15 characters.")
        .required('Please enter your client number.'),
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
        .max(new Date("2022-03-31 12:00:00"), "This is a limited time program must end before March 31 2022")
        .required("Please Enter your clients program end date"),
    
    // STEP 2
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
        .required("please enter your organizations address"),
    clientCity:yup.string()
        .max(100,"City name too long")
        .required("please enter your organizations city"),
    clientProvince:yup.string()
        .required("Please enter a valid province"),
    clientPostal:yup.string()
        .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,"Please enter a valid Postal Code")
        .required("Please enter a valid Postal Code"),
    altShippingAddress: yup.boolean(),
    clientResidesInBC:yup.string()
    .oneOf(["yes",
            "no"],"Please select a valid field.")
    .required("Please select an answer on whether the client resides in BC"),
    clientUnemployed:yup.string()
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


    //step 1:pop-up fields
    trainingProgramISET: yup.string()
    .when("fundingSource",{ 
        is:"ISET",
        then:yup.string().required('Please select your clients program.')
        }),
    trainingProgramAEST: yup.string()
    .when("fundingSource",{ 
        is:"AEST",
        then:yup.string().required('Please select your clients program.')
        }),
    trainingProgramSDPR: yup.string()
    .when("fundingSource",{ 
        is:"SDPR",
        then:yup.string().required('Please select your clients program.')
        }),
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
    
    
    signatoryTitle: yup.string()
        .required("Please enter the title of the organization signatory.")
        .test('match','Signatories must be different',function (signatoryTitle){
            return signatoryTitle !== this.options.parent.signatory1
        }),   
    signatory1: yup.string()
        .required("Please enter the full name of the organization signatory."),
    clientEligibility: yup.boolean()
        .oneOf([true],"Required"),
    organizationConsent: yup.boolean()
        .oneOf([true],"Required"),
})