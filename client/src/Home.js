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
                    <p>Approved eligible SDPR skills training and/or employment programs include:  WorkBC Skills Enhancement Services, WorkBC Project Based Labour Market Training and WorkBC Self Employment Services</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Apply on behalf of client</h3>
                    <p><a href="/ProviderIntake" className="btn btn-lg btn-primary">Start</a><br/></p>
                </div>
                <div className="col-md-6">
                    <h3>Verify Application Information</h3>
                    <p><a href="/needEmployee" className="btn btn-lg btn-primary">Start</a><br/></p>
                </div>
            </div>
        </div>
    )
}

export default Home;