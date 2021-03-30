import React from 'react'

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Access To Technology</h1>
                    <p>Access to Technology (A2T) will provide basic laptops to eligible clients participating in specific training programs administered by SDPR, AEST and ISET, which:</p>
                    <ul>
                        <li>Have an online learning component; and</li>
                        <li>Lead to employment; and</li>
                        <li>Are a minimum of 4 weeks in duration; and</li>
                        <li>Are on the list of approved skills training and/or employment programs</li>
                    </ul>
                    <p>Approved eligible training programs include:</p>
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
                            <li>Indigenous Employment and Skills Training</li>
                        </ul></li>
                        <li><b>Indigenous Skills and Employment Training: </b>
                        <ul>
                            <li>Essential Skills (TBD)</li>
                            <li>Skills Training (TBD)</li>
                            <li>Pre-Apprenticeship (TBD)</li>
                        </ul></li>
                    </ul>
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