import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import ProviderIntakeForm from './components/Forms/ProviderIntakeForm/ProviderIntakeForm'
import ThankYouProviderIntake from './components/Forms/ProviderIntakeForm/thankyouProviderIntake'
import ParticipantIntakeForm from './components/Forms/ParticipantForm/ParticipantForm'
import ThankYouParticipant from './components/Forms/ParticipantForm/thankyouParticipant'
import SendConsentForm from './components/Forms/SendConsentForm/SendConsentForm'
import ThankYouSendConsent from './components/Forms/SendConsentForm/thankyouSendConsent'

import SurveyParticipant from './components/Forms/ServiceProviderSurvey/SurveyParticipant'
import ThankYouSurveyParticipant from './components/Forms/ServiceProviderSurvey/ThankYouSurveyParticipant'
import SurveyStartParticipant from './components/Forms/ServiceProviderSurvey/SurveyStartParticipant'

import CourseCompletionSurvey from './components/Forms/CourseCompletionSurvey/CourseCompletionSurvey'
import ThankYouCourseCompletion from './components/Forms/CourseCompletionSurvey/thankyouCourseCompletion'

import EmploymentSurvey from './components/Forms/EmploymentSurvey/EmploymentSurvey'
import ThankYouEmploymentSurvey from './components/Forms/EmploymentSurvey/thankyouEmploymentSurvey'

import ParticipantSurvey from './components/Forms/ParticipantSurvey/ParticipantSurvey'
import ThankYouParticipantSurvey from './components/Forms/ParticipantSurvey/thankyouParticipantSurvey'





function Main() {
    return (
        <main role="main">
            <Router>
                <Switch>
                    <Route path="/ProviderIntake" component={ProviderIntakeForm} />
                    <Route path="/ProviderIntake/:id/:token/" component={ProviderIntakeForm} />
                    <Route path="/thankyouProviderIntake" component={ThankYouProviderIntake}  />
                    
                    
                    <Route path="/clientConsent/:id/:token/" component={ParticipantIntakeForm} />
                    <Route path="/thankyouParticipant" component={ThankYouParticipant} />
                    
                    <Route path="/SendConsentForm" component={SendConsentForm} />
                    <Route path="/thankyouSendConsent" component={ThankYouSendConsent} />
                    
                    <Route path="/surveyParticipant/2" component={SurveyParticipant} />
                    <Route path="/thankyouSurveyParticipant" component={ThankYouSurveyParticipant} />
                    <Route path="/surveyLandingParticipant/:intake?" component={SurveyStartParticipant} />
                    <Route path="/surveyParticipant/3" component={SurveyParticipant} />

                    <Route path="/courseCompletionSurvey/:id/:token/" component={CourseCompletionSurvey} />
                    <Route path="/thankyouCourseCompletion" component={ThankYouCourseCompletion} />

                    <Route path="/EmploymentSurvey/:id/:token/" component={EmploymentSurvey} />
                    <Route path="/thankyouEmploymentSurvey" component={ThankYouEmploymentSurvey} />

                    <Route path="/ParticipantSurvey/:id/:token/" component={ParticipantSurvey} />
                    <Route path="/thankyouParticipantSurvey" component={ThankYouParticipantSurvey}  />


                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </main>
    )
    
}

export default Main