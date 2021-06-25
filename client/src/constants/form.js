export const FORM_URL = {
    ProviderIntakeForm: '',
    needEmployeeForm: '',
}

if (process.env.NODE_ENV === 'development'){
    FORM_URL.ProviderIntakeForm = 'http://localhost:8000/api/providerForm'
    FORM_URL.clientForm = 'http://localhost:8000/api/participantForm'
    FORM_URL.sendConsentForm = 'http://localhost:8000/api/sendConsentForm'
} else if (process.env.NODE_ENV === 'production') {
    FORM_URL.ProviderIntakeForm = '/api/providerForm'
    FORM_URL.clientForm = '/api/participantForm'  
    FORM_URL.sendConsentForm = '/api/sendConsentForm'
}