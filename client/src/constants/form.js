export const FORM_URL = {
    ProviderIntakeForm: '',
    needEmployeeForm: '',
    claimForm: '',
    clientForm: '',
}

if (process.env.NODE_ENV === 'development'){
    FORM_URL.ProviderIntakeForm = 'http://localhost:8000/api/providerForm'
    FORM_URL.needEmployeeForm = 'http://localhost:8000/api/needEmployeeForm'
    FORM_URL.clientForm = 'http://localhost:8000/api/participantForm'
    FORM_URL.claimForm = 'http://localhost:8000/api/claimForm'
} else if (process.env.NODE_ENV === 'production') {
    FORM_URL.ProviderIntakeForm = '/api/providerForm'
    FORM_URL.needEmployeeForm = '/api/needEmployeeForm'
    FORM_URL.clientForm = '/api/participantForm'  
    FORM_URL.claimForm = '/api/claimForm'
}