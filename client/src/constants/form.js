export const FORM_URL = {
    ProviderIntakeForm: '',
    sendForm:'',
    needEmployeeForm: '',
}

if (process.env.NODE_ENV === 'development'){
    FORM_URL.ProviderIntakeForm = 'http://localhost:8000/api/providerForm'
    FORM_URL.clientForm = 'http://localhost:8000/api/participantForm'
    FORM_URL.sendForm = 'http://localhost:8000/api/sendConsentForm'
   
    //add the 4 surveys then add to client-dc.yml so they can be seen on 
} else if (process.env.NODE_ENV === 'production') {
    FORM_URL.ProviderIntakeForm = '/api/providerForm'
    FORM_URL.clientForm = '/api/participantForm'  
    FORM_URL.sendForm = '/api/sendConsentForm'
    
}