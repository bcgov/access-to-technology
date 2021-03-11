import React, { Component } from 'react'


class thankyouParticipant extends Component {
    
    render() {

        const altShippingAddress = this.props.location.state !== undefined && this.props.location.state.altShippingAddress;
        const fundedISET = (this.props.location.state !== undefined && (this.props.location.state.fundingSource === "ISET"));
        const fundedAEST = (this.props.location.state !== undefined && (this.props.location.state.fundingSource === "AEST"));
        const fundedSDPR = (this.props.location.state !== undefined && (this.props.location.state.fundingSource === "SDPR"));


        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Thank you, your application has been received</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button><br /><br />
                        <p>Thank you for your interest in Access To Technology services. Your application has been received and a staff member will be in touch with you soon to confirm your client qualifies for Access To Technology and to complete the application process. </p>
                        <p>
                            The following information was received:
                        </p>
                        <br />
                        <hr /> <h5>Application Tracking Information</h5>
                                <p>Client Application ID:  {this.props.location.state !== undefined && this.props.location.state._id}</p>
                                <p>Contact Name:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderContact}</p>
                                <p>Email Address:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderEmail}</p>
                                <p>Phone Number:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderPhone}</p>
                                
                                <h5>Client Program Information</h5>
                                {fundedISET ? (
                                    <div>
                                        <p>Approved Eligible Skills Training and Employment Program:  {this.props.location.state !== undefined && this.props.location.state.trainingProgramISET}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }{fundedAEST ? (
                                    <div>
                                        <p>Approved Eligible Skills Training and Employment Program:  {this.props.location.state !== undefined && this.props.location.state.trainingProgramAEST}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }{fundedSDPR ? (
                                    <div>
                                        <p>Approved Eligible Skills Training and Employment Program:  {this.props.location.state !== undefined && this.props.location.state.trainingProgramSDPR}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }
                                 
                                <p>Program Start Date:  {this.props.location.state !== undefined && this.props.location.state.periodStart1}</p>
                                <p>Program End Date:  {this.props.location.state !== undefined && this.props.location.state.periodEnd1}</p>
                                
                                <h5>Client Information</h5>
                                <p>FullName:  {this.props.location.state !== undefined && this.props.location.state.clientName}</p>
                                <p>Address:  {this.props.location.state !== undefined && this.props.location.state.clientAddress}</p>
                                <p>City / Town:  {this.props.location.state !== undefined && this.props.location.state.clientCity}</p>
                                <p>Province:  {this.props.location.state !== undefined && this.props.location.state.clientProvince}</p>
                                <p>Postal:  {this.props.location.state !== undefined && this.props.location.state.clientPostal}</p>
                                <p>Email Address:  {this.props.location.state !== undefined && this.props.location.state.clientEmail}</p>
                                <p>Phone Number:  {this.props.location.state !== undefined && this.props.location.state.clientPhone}</p>

                                {altShippingAddress ? (
                                    <div>
                                        <h5>Shipping Information (only if different from client home address)</h5>
                                        <p>Work Address:  {this.props.location.state !== undefined && this.props.location.state.addressAlt}</p>
                                        <p>City / Town:  {this.props.location.state !== undefined && this.props.location.state.cityAlt}</p>
                                        <p>Province:  {this.props.location.state !== undefined && this.props.location.state.provinceAlt}</p>
                                        <p>Postal:  {this.props.location.state !== undefined && this.props.location.state.postalAlt}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }

                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}

export default thankyouParticipant