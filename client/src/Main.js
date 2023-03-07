import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'

import ProviderIntakeForm from './components/Forms/ProviderIntakeForm/ProviderIntakeForm'
import ThankYouProviderIntake from './components/Forms/ProviderIntakeForm/thankyouProviderIntake'

import ParticipantIntakeForm from './components/Forms/ParticipantForm/ParticipantForm'
import ThankYouParticipant from './components/Forms/ParticipantForm/thankyouParticipant'

import SendConsentForm from './components/Forms/SendConsentForm/SendConsentForm'
import ThankYouSendConsent from './components/Forms/SendConsentForm/thankyouSendConsent'

import ServiceProviderSurvey from './components/Forms/ServiceProviderSurvey/ServiceProviderSurvey'
import ThankYouServiceProviderSurvey from './components/Forms/ServiceProviderSurvey/ThankYouServiceProviderSurvey'

import CourseCompletionSurvey from './components/Forms/CourseCompletionSurvey/CourseCompletionSurvey'
import ThankYouCourseCompletion from './components/Forms/CourseCompletionSurvey/thankyouCourseCompletion'

import EmploymentSurvey from './components/Forms/EmploymentSurvey/EmploymentSurvey'
import ThankYouEmploymentSurvey from './components/Forms/EmploymentSurvey/thankyouEmploymentSurvey'

import ParticipantSurvey from './components/Forms/ParticipantSurvey/ParticipantSurvey'
import ThankYouParticipantSurvey from './components/Forms/ParticipantSurvey/thankyouParticipantSurvey'

import SurveyNotAvailable from './components/Forms/SurveyNotAvailable/SurveyNotAvailable'





function Main() {
    return (
        <main role="main">
            <Router>
                <Switch>
                    <Route path="/thankyouProviderIntake" component={ThankYouProviderIntake}  />
                    
                    <Route path="/thankyouParticipant" component={ThankYouParticipant} />
                    
                    <Route path="/thankyouSendConsent" component={ThankYouSendConsent} />

                    <Route path="/courseCompletionSurvey/:id/:token/" component={SurveyNotAvailable} />
                    <Route path="/thankyouCourseCompletion" component={ThankYouCourseCompletion} />

                    <Route path="/EmploymentSurvey/:id/:token/" component={SurveyNotAvailable} />
                    <Route path="/thankyouEmploymentSurvey" component={ThankYouEmploymentSurvey} />

                    <Route path="/ParticipantSurvey/:id/:token/" component={SurveyNotAvailable} />
                    <Route path="/thankyouParticipantSurvey" component={ThankYouParticipantSurvey}  />

                    <Route path="/ServiceProviderSurvey/:id/" component={SurveyNotAvailable} />
                    <Route path="/thankyouServiceProviderSurvey" component={ThankYouServiceProviderSurvey} />

                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </main>
    )
    
}

export default Main