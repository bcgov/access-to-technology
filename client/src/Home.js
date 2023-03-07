import React from 'react'

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="form-row">
                            <div className="col-md-12">
                                <div>
                                    <div className="alert alert-dismissible alert-info">
                                        <button type="button" className="close" data-dismiss="alert">×</button>
                                        <b>Thank you for your participation in the Access to Technology (A2T) program.</b>  We have distributed all our supply of laptops and this one-time program initiative is now over. <br />
                                        Technical support remains in place until September 2023. Should your client have a technical or hardware issue please call <b>1-877-250-9936</b> (Monday – Friday 8:30 – 4:30 PST).
                                    </div>
                                </div>
                            </div>
                        <div className="form-row col-md-6">
                            <h1>Access to Technology</h1>
                            
                            <p>Access to Technology (A2T) will provide basic laptops to eligible clients participating in specific 
                                    training programs administered by Social Development and Poverty Reduction (SDPR), 
                                    Advanced Education and Skills Training (AEST) and Indigenous Skills and Employment Training (ISET), which:</p>
                                <ul>
                                    <li>Have an online learning component;</li>
                                    <li>Leads to employment;</li>
                                    <li>Is a minimum of four consecutive weeks; and</li>
                                    <li>Is on the list of approved skills training programs.</li>
                                </ul>
                                <p>For additional Service Provider Information see the <a href="/PDF/A2TServiceProviderGuide.pdf" target="_blank" rel="noopener noreferrer" >Access to Technology (A2T) Service Provider Guide</a> and the <a href="/PDF/A2TServiceProviderOverview.pdf" target="_blank" rel="noopener noreferrer" >Access to Technology (A2T) Service Provider Overview</a>.</p>
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
                                        <li>Other Eligible Services</li>
                                    </ul>
                                    <b className="text-primary">Workforce Development and Skills Training:  </b>
                                    <ul>
                                        <li>Skills Training for Employment</li>
                                        <li>ITA Funded Pre-Apprenticeship Training</li>
                                        <li>BladeRunners</li>
                                    </ul>
                                <b className="text-primary">Indigenous Skills and Employment Training: </b>
                                <ul>
                                    <li>Skills training programs, as identified by each participating ISET Service Provider.</li>
                                </ul>
                                <p><b>Note</b>: The organization that is responsible for administering the majority share of funding for the approved skills training program must complete the A2T application form on their client’s behalf. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home;