export const FORM_URL = {
    ProviderIntakeForm: '',
    needEmployeeForm: '',
}

if (process.env.NODE_ENV === 'development'){
    FORM_URL.ProviderIntakeForm = 'http://localhost:8000/api/providerForm'
    FORM_URL.clientForm = 'http://localhost:8000/api/participantForm'
} else if (process.env.NODE_ENV === 'production') {
    FORM_URL.ProviderIntakeForm = '/api/providerForm'
    FORM_URL.clientForm = '/api/participantForm'  
}