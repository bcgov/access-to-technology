import React, { Component } from 'react'


class thankyouProviderIntake extends Component {
    
    render() {

        const altShippingAddress = this.props.location.state !== undefined && this.props.location.state.altShippingAddress;
        const fundedSDPR = (this.props.location.state !== undefined && (this.props.location.state.fundingSource === "SDPR"));


        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Your Application has been received.</h1>
                        <h3>Application ID: {this.props.location.state !== undefined && this.props.location.state._id}</h3>
                        <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button><br /><br />
                        <p>Thank you for submitting an application for the Access to Technology (A2T) Program. The application will be reviewed, and eligible clients will receive an A2T laptop.    </p>
                        <p>IMPORTANT NOTICE: If information on this application is incorrect, please contact <a href="mailto:elmsd.webmaster@gov.bc.ca" title="MSDPR Email Address">MSDPR Email Address</a> and include Application ID referenced above in the subject of the email.</p>
                        <p>
                            The following information was received:
                        </p>
                        <br />
                        <hr /> <h5>Application Tracking Information</h5>
                                <p>Client Application ID:  {this.props.location.state !== undefined && this.props.location.state._id}</p>
                                <p>Service Provider Name:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderName}</p>
                                <p>Referring Ministry:  {this.props.location.state !== undefined && this.props.location.state.fundingSource}</p>
                                <p>Service Provider Postal:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderPostal}</p>
                                <p>Staff Name:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderContact}</p>
                                <p>Contact Email Address:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderEmail}</p>
                                <p>Contact Phone Number:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderPhone}</p>
                                <p>Contract Reference ID:  {this.props.location.state !== undefined && this.props.location.state.providerContractId}</p>
                                
                                <h5>Program Eligibility</h5>
                                    <div>
                                        <p>Approved Eligible Skills Training and Employment Program:  {this.props.location.state !== undefined && this.props.location.state.trainingProgram}</p>
                                    </div>
                                <p>Training Program Start Date:  {this.props.location.state !== undefined && this.props.location.state.periodStart1.toString()}</p>
                                <p>Training Program End Date:  {this.props.location.state !== undefined && this.props.location.state.periodEnd1.toString()}</p>
                                <h5>Client Eligibility</h5>
                                <p>Client is unemployed or precariously employed:  {this.props.location.state !== undefined && this.props.location.state.unemployed}</p>
                                <p>Select which of the following form(s) of government assistance the client is receiving (choose all that apply): <br/> {this.props.location.state !== undefined && this.props.location.state.BCEAorFederalOnReserve.join(" ")}</p>
                                
                                <h5>Client Information</h5>
                                {fundedSDPR ? (
                                    <div>
                                        <p>WorkBC Case Number:  {this.props.location.state !== undefined && this.props.location.state.workBCCaseNumber}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }
                                <p>Client First Name:  {this.props.location.state !== undefined && this.props.location.state.clientName}</p>
                                <p>Client Last Name:  {this.props.location.state !== undefined && this.props.location.state.clientLastName}</p>
                                <p>Client Middle Name:  {this.props.location.state !== undefined && this.props.location.state.clientMiddleName}</p>
                                <p>Street Address:  {this.props.location.state !== undefined && this.props.location.state.clientAddress}</p>
                                <p>Street Address 2:  {this.props.location.state !== undefined && this.props.location.state.clientAddress2}</p>
                                <p>City / Town:  {this.props.location.state !== undefined && this.props.location.state.clientCity}</p>
                                <p>Province:  {this.props.location.state !== undefined && this.props.location.state.clientProvince}</p>
                                <p>Postal:  {this.props.location.state !== undefined && this.props.location.state.clientPostal}</p>
                                <p>Email Address:  {this.props.location.state !== undefined && this.props.location.state.clientEmail}</p>
                                <p>Phone Number:  {this.props.location.state !== undefined && this.props.location.state.clientPhone}</p>

                                {altShippingAddress ? (
                                    <div>
                                        <h5>Shipping Information (only if different from client home address)</h5>
                                        <p>Street Address 1:  {this.props.location.state !== undefined && this.props.location.state.addressAlt}</p>
                                        <p>Street Address 2:  {this.props.location.state !== undefined && this.props.location.state.addressAlt2}</p>
                                        <p>City / Town:  {this.props.location.state !== undefined && this.props.location.state.cityAlt}</p>
                                        <p>Province:  {this.props.location.state !== undefined && this.props.location.state.provinceAlt}</p>
                                        <p>Postal:  {this.props.location.state !== undefined && this.props.location.state.postalAlt}</p>
                                    </div>
                                 ) : (<div></div>) 
                                 }

                             {/*}   <h5>Client Eligibility and Need Assessment </h5>
                                <p>Is the Client a Resident of BC:  {this.props.location.state !== undefined && this.props.location.state.clientResidesInBC}</p>
                                <p>is the client Unemployed or precariously employed:  {this.props.location.state !== undefined && this.props.location.state.clientUnemployed}</p>
                                <p>Is the client participating in an approved eligible skills training and employment program:  {this.props.location.state !== undefined && this.props.location.state.registeredInApprovedProgram}</p>
                                <p>Does the client not have access to a suitable computer and requires a computer to participate in online training:  {this.props.location.state !== undefined && this.props.location.state.accessToComputerCurrently}</p>
                                <p>Is the client not receiving funding from another source for the purchase of the required technology :  {this.props.location.state !== undefined && this.props.location.state.ReceivingAlternateFunding}</p>
                                <p>The service provider has confirmed the client has a demonstrated financial need to take part in this program : {this.props.location.state !== undefined && this.props.location.state.financialNeed}</p>
                                */}
                                                          
                                <h5>Declaration and Signature</h5>
                               {/* <p>Signing Authority Title:  {this.props.location.state !== undefined && this.props.location.state.signatory1}</p>
                                <p>Signatory Authority Full Name:  {this.props.location.state !== undefined && this.props.location.state.signatoryTitle}</p>*/}
                                <p>Client Eligibility Attestation:  {this.props.location.state !== undefined && this.props.location.state.clientEligibility.toString()}</p>
                                <p>Service Provider Responsibility Attestation:  {this.props.location.state !== undefined && this.props.location.state.serviceProviderResponsibility.toString()}</p>
                                {/*<p>I acknowledge and understand that by clicking the "submit" I am attaching my electronic signature to this form and that 
                                    by doing so I acquire the same rights, incur the same obligations and confer the same consent as I would by manually 
                            signing a physical copy of this form :  {this.props.location.state !== undefined && this.props.location.state.organizationConsent.toString()}</p>*/}
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}

export default thankyouProviderIntake