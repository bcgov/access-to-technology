import React, { Component } from 'react'
import moment from 'moment'


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
                        <p>IMPORTANT NOTICE: If information on this application is incorrect, please contact <a href="mailto:AccessToTechnology@gov.bc.ca" title="A2T Email Address">Access To Technology</a> and include the Application ID referenced above in the subject of the email.</p>
                        <p>
                            The following information was received:
                        </p>
                        <br />
                            <div className="row">
                            <div className="col-md-6">
                                    <h3>Application Tracking Information</h3>
                                        <p><b>Application ID:</b>  {this.props.location.state !== undefined && this.props.location.state._id}</p>
                                        <br />
                                    <h3>Service Provider Information</h3>
                                        <p><b>Referring Ministry:</b>  {this.props.location.state !== undefined && this.props.location.state.fundingSource}</p>
                                        <p><b>Service Provider Name:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderName}</p>
                                        <p><b>Contract Reference ID:</b>  {this.props.location.state !== undefined && this.props.location.state.providerContractId}</p>
                                        <p><b>Staff Name:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderContact}</p>
                                        <p><b>Service Provider Postal Code:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderPostal}</p>
                                        <p><b>Contact Email Address:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderEmail}</p>
                                        <p><b>Contact Phone Number:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderPhone}</p>
                            </div>
                            <div className="col-md-6">
                                <h3>Client Information</h3>
                                        {fundedSDPR ? (
                                            <div>
                                                <p><b>WorkBC Case Number:</b>  {this.props.location.state !== undefined && this.props.location.state.workBCCaseNumber}</p>
                                            </div>
                                        ) : (<div></div>) 
                                        }
                                        <p><b>Client First Name:</b>  {this.props.location.state !== undefined && this.props.location.state.clientName}</p>
                                        <p><b>Client Last Name:</b>  {this.props.location.state !== undefined && this.props.location.state.clientLastName}</p>
                                        <p><b>Client Middle Name:</b>  {this.props.location.state !== undefined && this.props.location.state.clientMiddleName}</p>
                                        <p><b>Phone Number:</b>  {this.props.location.state !== undefined && this.props.location.state.clientPhone}</p>
                                        <p><b>Email Address:</b>  {this.props.location.state !== undefined && this.props.location.state.clientEmail}</p>
                                        <p><b>Street Address:</b>  {this.props.location.state !== undefined && this.props.location.state.clientAddress}</p>
                                        <p><b>Street Address 2:</b>  {this.props.location.state !== undefined && this.props.location.state.clientAddress2}</p>
                                        <p><b>City / Town:</b>  {this.props.location.state !== undefined && this.props.location.state.clientCity}</p>
                                        <p><b>Province:</b>  {this.props.location.state !== undefined && this.props.location.state.clientProvince}</p>
                                        <p><b>Postal Code:</b>  {this.props.location.state !== undefined && this.props.location.state.clientPostal}</p>
                                    

                                        {altShippingAddress ? (
                                            <div>
                                                <h3>Shipping Information (only if different from client home address)</h3>
                                                <p><b>Street Address 1:</b>  {this.props.location.state !== undefined && this.props.location.state.addressAlt}</p>
                                                <p><b>Street Address 2:</b>  {this.props.location.state !== undefined && this.props.location.state.addressAlt2}</p>
                                                <p><b>City / Town:</b>  {this.props.location.state !== undefined && this.props.location.state.cityAlt}</p>
                                                <p><b>Province:</b>  {this.props.location.state !== undefined && this.props.location.state.provinceAlt}</p>
                                                <p><b>Postal Code:</b>  {this.props.location.state !== undefined && this.props.location.state.postalAlt}</p>
                                            </div>
                                        ) : (<div></div>) 
                                        }
                                </div>
                               
                               
                            </div>
                                <br></br>
                                <hr />
                                <h3>Program Eligibility</h3>
                                <div>
                                    <p><b>Approved Eligible Skills Training Program:</b>  {this.props.location.state !== undefined && this.props.location.state.trainingProgram}</p>
                                </div>
                                <p><b>Training Program Start Date:</b>  {this.props.location.state !== undefined && moment(this.props.location.state.periodStart1).format('MMMM Do YYYY').toString()}</p>
                                <p><b>Training Program End Date:</b>  {this.props.location.state !== undefined && moment(this.props.location.state.periodEnd1).format('MMMM Do YYYY').toString()}</p>
                                
                                <h3>Client Eligibility</h3>
                                <p><b>Client is unemployed or precariously employed:</b>  {this.props.location.state !== undefined && this.props.location.state.unemployed}</p>
                                <p><b>Select which of the following form(s) of government assistance the client is receiving (choose all that apply):</b> <br/> {this.props.location.state !== undefined && this.props.location.state.BCEAorFederalOnReserve.join(" ")}</p>
                                
                              

                             {/*}   <h5>Client Eligibility and Need Assessment </h5>
                                <p>Is the Client a Resident of BC:  {this.props.location.state !== undefined && this.props.location.state.clientResidesInBC}</p>
                                <p>is the client Unemployed or precariously employed:  {this.props.location.state !== undefined && this.props.location.state.clientUnemployed}</p>
                                <p>Is the client participating in an approved eligible skills training and employment program:  {this.props.location.state !== undefined && this.props.location.state.registeredInApprovedProgram}</p>
                                <p>Does the client not have access to a suitable computer and requires a computer to participate in online training:  {this.props.location.state !== undefined && this.props.location.state.accessToComputerCurrently}</p>
                                <p>Is the client not receiving funding from another source for the purchase of the required technology :  {this.props.location.state !== undefined && this.props.location.state.ReceivingAlternateFunding}</p>
                                <p>The service provider has confirmed the client has a demonstrated financial need to take part in this program : {this.props.location.state !== undefined && this.props.location.state.financialNeed}</p>
                                */}
                                <hr />                          
                                <h3>Declaration and Signature</h3>
                               {/* <p>Signing Authority Title:  {this.props.location.state !== undefined && this.props.location.state.signatory1}</p>
                                <p>Signatory Authority Full Name:  {this.props.location.state !== undefined && this.props.location.state.signatoryTitle}</p>*/}
                                <p><b>Client Eligibility Attestation:</b>  {this.props.location.state !== undefined && this.props.location.state.clientEligibility.toString()}</p>
                                <p><b>Service Provider Responsibility Attestation:</b>  {this.props.location.state !== undefined && this.props.location.state.serviceProviderResponsibility.toString()}</p>
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