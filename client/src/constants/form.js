export const FORM_URL = {
    ProviderIntakeForm: '',
    sendForm:'',
    needEmployeeForm: '',
}

if (process.env.NODE_ENV === 'development'){
    FORM_URL.ProviderIntakeForm = 'http://localhost:8000/api/providerForm'
    FORM_URL.clientForm = 'http://localhost:8000/api/participantForm'
    FORM_URL.sendForm = 'http://localhost:8000/api/sendConsentForm'
    FORM_URL.serviceProviderSurvey = 'http://localhost:8000/api/serviceProviderSurvey'
    FORM_URL.courseCompletionSurvey = 'http://localhost:8000/api/courseCompletionSurvey'
    FORM_URL.employmentSurvey = 'http://localhost:8000/api/employmentSurvey'
    FORM_URL.participantSurvey = 'http://localhost:8000/api/participantSurvey'

   
    //add the 4 surveys then add to client-dc.yml so they can be seen on 
} else if (process.env.NODE_ENV === 'production') {
    FORM_URL.ProviderIntakeForm = '/api/providerForm'
    FORM_URL.clientForm = '/api/participantForm'  
    FORM_URL.sendForm = '/api/sendConsentForm'
    FORM_URL.serviceProviderSurvey = '/api/serviceProviderSurvey'
    FORM_URL.courseCompletionSurvey = '/api/courseCompletionSurvey'
    FORM_URL.employmentSurvey = '/api/employmentSurvey'
    FORM_URL.participantSurvey = '/api/participantSurvey'

    
}