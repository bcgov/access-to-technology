import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home'
import ProviderIntakeForm from './components/Forms/ProviderIntakeForm/ProviderIntakeForm'
import ThankYouProviderIntake from './components/Forms/ProviderIntakeForm/thankyouProviderIntake'
import ParticipantIntakeForm from './components/Forms/ParticipantForm/ParticipantForm'
import ThankYouParticipant from './components/Forms/ParticipantForm/thankyouParticipant'


function Main() {
    return (
        <main role="main">
            <Router>
                <Switch>
                    <Route path="/ProviderIntake" component={ProviderIntakeForm} />
                    <Route path="/thankyouProviderIntake" component={ThankYouProviderIntake}  />
                    <Route path="/thankyouParticipant" component={ThankYouParticipant} />
                    <Route path="/clientConsent/:id/:token/" component={ParticipantIntakeForm} />
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </main>
    )
    
}

export default Main