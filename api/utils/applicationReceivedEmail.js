var strings = require("./strings")
var formatDate = require("../utils/formatDate")
var moment = require('moment')

module.exports = {

    generateNotification: function (values) {

        var html = "";
        for (var key in values) {
            html += `${key} ${strings.orEmpty(values[key])} `;
        }
        return html
    },

    generateListNotification: function(values) {
        var html = "";
        // loop through each property
        for (var key in values) {
            // add key/val to html
            html += `<p><b>${key}:</b> ${strings.orEmpty(values[key])}</p>`;
        }

        return html;
    },

    generateProviderIntakeNotification: function(values){
        const alternativeAddress = values.altShippingAddress;
        const fundedSDPR = (strings.orEmpty(values.fundingSource)=== "SDPR");
       
        var html = /*html*/`
        <h2>Access to Technology Application</h2>
        <p>Thank you for submitting an application for the Access to Technology (A2T) Program. The application will be reviewed, and eligible clients will receive an A2T laptop. Application details are included below for your reference.</p>
        <p>IMPORTANT NOTICE: If information on this application is incorrect, please contact <MSDPR Email Address> and include Application ID referenced above in the subject of the email.</p>
        <p>Application ID:  ${strings.orEmpty(values._id)}</p>
        <p>Referring Ministry:  ${strings.orEmpty(values.fundingSource)}</p>
        <p>Service Provider Name:  ${strings.orEmpty(values.serviceProviderName)}</p>
        <p>Contract Reference ID:  ${strings.orEmpty(values.providerContractId)}</p>
        <p>Staff Name:  ${strings.orEmpty(values.serviceProviderContact)}</p>
        <p>Service Provider Postal:  ${strings.orEmpty(values.serviceProviderPostal)}</p>
        <p>Contact Phone Number:  ${strings.orEmpty(values.serviceProviderPhone)}</p>
        <p>Contact Email:  ${strings.orEmpty(values.serviceProviderEmail)}</p>
       
        <hr />
        <h5>Program Eligibility </h5>
         <p>Eligible Skills Training Program:  ${strings.orEmpty(values.trainingProgram)}</p>
         <p>Training Program Start Date:  ${strings.orEmpty(moment(values.periodStart1).format('MMMM Do YYYY'))}</p>
         <p>Training Program End Date:  ${strings.orEmpty(moment(values.periodEnd1).format('MMMM Do YYYY'))}</p>
        <h5>Client Eligibility</h5>
         <p>Client is unemployed or precariously employed:  ${strings.orEmpty(values.unemployed)}</p>
         <p>Select which of the following form(s) of government assistance the client is receiving (choose all that apply): <br/>  ${strings.orEmpty(values.BCEAorFederalOnReserve.join('<br/>'))}</p>
         <hr />

        <h5>Client Information</h5>
        ${fundedSDPR ? (
            `<p>WorkBC Case Number:  ${strings.orEmpty(values.workBCCaseNumber)}</p>`
         ) : (``) 
         }
        <p>Client First Name:  ${strings.orEmpty(values.clientName)}</p>
        <p>Client Last Name:  ${strings.orEmpty(values.clientLastName)}</p>
        <p>Client Middle Name:  ${strings.orEmpty(values.clientMiddleName)}</p>
        <p>Phone Number:  ${strings.orEmpty(values.clientPhone)}</p>
        <p>E-mail Address:  ${strings.orEmpty(values.clientEmail)}</p>
        <p>Street Address 1:  ${strings.orEmpty(values.clientAddress)}</p>
        <p>Street Address 2:  ${strings.orEmpty(values.clientAddress2)}</p>
        <p>City/Town:  ${strings.orEmpty(values.clientCity)}</p>
        <p>Province:  ${strings.orEmpty(values.clientProvince)}</p>
        <p>Postal Code:  ${strings.orEmpty(values.clientPostal)}</p>
        <hr />
        `
        if(alternativeAddress){
            html= html + `
            <h5>Shipping Address Information(only if different from Home Address)</h5>
            <p>Street Address 1:  ${strings.orEmpty(values.addressAlt)}</p>
            <p>Street Address 2:  ${strings.orEmpty(values.addressAlt2)}</p>
            <p>City/Town:  ${strings.orEmpty(values.cityAlt)}</p>
            <p>Province:  ${strings.orEmpty(values.provinceAlt)}</p>
            <p>Postal Code:  ${strings.orEmpty(values.postalAlt)}</p>
            <hr />
            `
        }
        

        html = html +`
        <h5>Confirmation and Agreement</h5>
        <p>Client Eligibility Confirmation:  ${strings.orEmpty(values.clientEligibility)}</p>
        <p>Service Provider Responsibility Attestation:  ${strings.orEmpty(values.serviceProviderResponsibility)}</p>
        <p>${strings.orEmpty(values.serviceProviderName)} ACKNOWLEDGES AND AGREES:</p>
        <ol style={{listStyleType:"decimal"}}>
        <li>To advise the Ministry of Social Development and Poverty Reduction("MSDPR") of the outcome of the individual’s participation in the approved training described in this application, in the form and manner requested by the ${strings.orEmpty(values.fundingSource)}; </li>
        <li>If ${strings.orEmpty(values.clientName)} does not complete the approved eligible training described in this application to the satisfaction of ${strings.orEmpty(values.serviceProviderName)} ), to:</li>
            <ol style={{listStyleType:"lower-alpha"}}>
                <li >Advise the MSDPR that the individual did not complete the training; and</li>
                <li >Exercise reasonable due diligence in notifying the individual of their obligation to return the laptop computer to the A2T contractor. </li>
            </ol>
        <li>If requested to do so by ${strings.orEmpty(values.fundingSource)}, to provide documentation to demonstrate ${strings.orEmpty(values.serviceProviderName)} has applied the criteria described in the confirmation above to assess the eligibility of ${strings.orEmpty(values.clientName)} for the A2T program; and</li>
        <li>That by clicking the "submit" icon below, ${strings.orEmpty(values.serviceProviderContact)}, an authorized signatory for ${strings.orEmpty(values.serviceProviderName)}  is attaching their electronic signature to this form, which has the same effect as if ${strings.orEmpty(values.serviceProviderContact)} were to manually sign a physical copy of this form.</li>
        </ol>`
       
        return html
    },


}