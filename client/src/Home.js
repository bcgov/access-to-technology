import React from 'react'

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-row">
                        <div className="form-row col-md-6">
                            <h1>Access to Technology</h1>
                            <p>Access to Technology (A2T) will provide basic laptops to eligible clients participating in specific 
                                    training programs administered by Social Development and Poverty Reduction (SDPR), 
                                    Advanced Education and Skills Training (AEST) and Indigenous Skills and Employment Training (ISET), which:</p>
                                <ul>
                                    <li>Start on or after August 15, 2021;</li>
                                    <li>Have an online learning component;</li>
                                    <li>Leads to employment;</li>
                                    <li>Is a minimum of four consecutive weeks; and</li>
                                    <li>Is on the list of approved skills training programs.</li>
                                </ul>
                                <p>For additional Service Provider Information see the <a href="https://www.workbc.ca/getmedia/3532dbe8-f084-4022-bd3c-8f9ebe422fa4/WS-Guide.aspx" target="_blank" rel="noopener noreferrer" >Access to Technology (A2T) Service Provider Guide</a>.</p>
                                <p>In order to submit an application for a client to access the A2T Program, you will need the following: </p>
                                <ol style={{listStyleType:"decimal"}}>
                                    <li>Training Program start and end dates</li>
                                    <li>Client Information (Name, Phone, Email, Shipping Address)</li>
                                </ol>
                               
                        </div>
                        <div className="form-row col-md-6">
                            <div className="jumbotron">
                                <p><b>Approved Skills Training Programs Include:</b></p>
                                
                                <b className="text-primary">WorkBC Employment Services: </b>
                                    <ul>
                                        <li>Short Duration Training</li>
                                        <li>Occupational Skills Training</li>
                                        <li>BC Adult Graduation Diploma</li>
                                    </ul>
                                    <b className="text-primary">Workforce Innovation and Skills Training:  </b>
                                    <ul>
                                        <li>Skills Training for Employment</li>
                                        <li>ITA Funded Pre-Apprenticeship Training</li>
                                        <li>BladeRunners</li>
                                    </ul>
                                <b className="text-primary">Indigenous Skills and Employment Training: </b>
                                <ul>
                                    <li>Skills training programs, as identified by each participating ISET Service Provider, and confirmed by the Ministry of Social Development and Poverty Reduction.</li>
                                </ul>
                                <p><b>Note</b>: The organization that is responsible for administering the majority share of funding for the approved skills training program must complete the A2T application form on their client’s behalf. </p>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-row col-md-6">
                            <h3>Step 1 - Send Client Consent and Agreement form</h3>
                            <p><a href="/SendConsentForm" className="btn btn-lg btn-primary">Start</a><br/></p>
                        </div>
                        <div className="form-row col-md-6">
                            <h3>Step 2 – Complete Application</h3>
                            <p>Once your client has completed the Client Consent and Agreement form, you will receive an email with a link to the online application form. Please use the link to complete the application on your client’s behalf.<br/></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home;