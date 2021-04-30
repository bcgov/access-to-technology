import React from 'react'

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Access to Technology</h1>
                    <p>Access to Technology (A2T) will provide basic laptops to eligible clients participating in specific 
                        training programs administered by Social Development and Poverty Reduction (SDPR), Advanced Education and Skills Training (AEST) and Indigenous Skills Training for Employment (ISET), which:</p>
                    <ul>
                        <li>Have an online learning component; and</li>
                        <li>Lead to employment; and</li>
                        <li>Are a minimum of 4 consecutive weeks in duration; and</li>
                        <li>Are on the list of approved skills training programs</li>
                    </ul>
                    <p>Approved eligible skills training programs include:</p>
                    <ul style={{listStyleType:"none"}}>
                       <li><b>WorkBC Employment Services: </b>
                        <ul>
                            <li>Short Duration Training</li>
                            <li>Occupational Skills Training</li>
                            <li>BC Adult Graduation Diploma</li>
                        </ul></li>
                        <li><b>Workforce Innovation and Skills Training:  </b>
                        <ul>
                            <li>Skills Training for Employment</li>
                            <li>ITA Funded Pre-Apprenticeship Training</li>
                            <li>BladeRunners</li>
                            <li>Indigenous Skills Training and Education</li>
                        </ul></li>
                        <li><b>Indigenous Skills and Employment Training: </b>
                        <ul>
                            <li>Essential Skills (TBD)</li>
                            <li>Skills Training (TBD)</li>
                            <li>Pre-Apprenticeship (TBD)</li>
                        </ul></li>
                    </ul>
                    <p>For additional Service Provider Information see the <a href="https://www.workbc.ca/getmedia/3532dbe8-f084-4022-bd3c-8f9ebe422fa4/WS-Guide.aspx" target="_blank" rel="noopener noreferrer" >Access to Technology (A2T) Service Provider Guide</a></p>
                    <p>In order to submit an application for a client to access the A2T Program, you will need the following: </p>
                    <ol style={{listStyleType:"decimal"}}>
                        <li>Confirmation of Client Eligibility </li>
                        <li>Confirmation of Training Program Eligibility</li>
                        <li>Service Provider Contract Reference ID</li>
                        <li>Training Program start and end dates</li>
                        <li>Client Information (Name, Phone, Email, Shipping Address)</li>
                        <li>Contract Reference ID</li>
                    </ol>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Apply on behalf of client</h3>
                    <p><a href="/ProviderIntake" className="btn btn-lg btn-primary">Start</a><br/></p>
                </div>
                {/*<div className="col-md-6">
                    <h3>Verify Application Information</h3>
                    <p><a href="/participantForm" className="btn btn-lg btn-primary">Start</a><br/></p>
                </div>*/}
            </div>
        </div>
    )
}

export default Home;