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
        <p>IMPORTANT NOTICE: If information on this application is incorrect, please contact <a href="mailto:AccessToTechnology@gov.bc.ca" title="A2T Email Address">Access To Technology</a> and include the Application ID referenced above in the subject of the email.</p>
        <h3>Application Tracking Information</h3>
        <p><b>Application ID:</b>  ${strings.orEmpty(values._id)}</p>
        <hr />
        <h3>Service Provider Information</h3>
        <p><b>Referring Ministry:</b>  ${strings.orEmpty(values.fundingSource)}</p>
        <p><b>Service Provider Name:</b>  ${strings.orEmpty(values.serviceProviderName)}</p>
        <p><b>Staff Name:</b>  ${strings.orEmpty(values.serviceProviderContact)}</p>
        <p><b>Service Provider Postal Code:</b>  ${strings.orEmpty(values.serviceProviderPostal)}</p>
        <p><b>Contact Email:</b>  ${strings.orEmpty(values.serviceProviderEmail)}</p>
        <p><b>Contact Phone Number:</b>  ${strings.orEmpty(values.serviceProviderPhone)}</p>

       
        <hr />
        <h3>Program Eligibility </h3>
         <p><b>Approved Eligible Skills Training Program:</b>  ${strings.orEmpty(values.trainingProgram)}</p>
         <p><b>Training Program Start Date:</b>  ${strings.orEmpty(moment(values.periodStart1).format('MMMM Do YYYY'))}</p>
         <p><b>Training Program End Date:</b>  ${strings.orEmpty(moment(values.periodEnd1).format('MMMM Do YYYY'))}</p>
        <h3>Client Eligibility</h3>
         <p><b>Client is unemployed or precariously employed:</b>  ${strings.orEmpty(values.unemployed)}</p>
         <p><b>Select which of the following form(s) of government assistance the client is receiving (choose all that apply):</b> <br/>  ${strings.orEmpty(values.BCEAorFederalOnReserve.join('<br/>'))}</p>
         <hr />

        <h3>Client Information</h3>
        ${fundedSDPR ? (
            `<p><b>WorkBC Case Number:</b>  ${strings.orEmpty(values.workBCCaseNumber)}</p>`
         ) : (``) 
         }
        <p><b>Client First Name:</b>  ${strings.orEmpty(values.clientName)}</p>
        <p><b>Client Last Name:</b>  ${strings.orEmpty(values.clientLastName)}</p>
        <p><b>Client Middle Name:</b>  ${strings.orEmpty(values.clientMiddleName)}</p>
        <p><b>Phone Number:</b>  ${strings.orEmpty(values.clientPhone)}</p>
        <p><b>E-mail Address:</b>  ${strings.orEmpty(values.clientEmail)}</p>
        <p><b>Street Address 1:</b>  ${strings.orEmpty(values.clientAddress)}</p>
        <p><b>Street Address 2:</b>  ${strings.orEmpty(values.clientAddress2)}</p>
        <p><b>City/Town:</b>  ${strings.orEmpty(values.clientCity)}</p>
        <p><b>Province:</b>  ${strings.orEmpty(values.clientProvince)}</p>
        <p><b>Postal Code:</b>  ${strings.orEmpty(values.clientPostal)}</p>
        <hr />
        `
        if(alternativeAddress){
            html= html + `
            <h5>Laptop will be delivered to the recipient below as per clients request:</h5>
            <p><b>Recipients Name 1:</b>  ${strings.orEmpty(values.recipientName)}</p>
            <hr />
            `
        }
        

        html = html +`
        <h3>Confirmation and Agreement</h3>
        <p><b>Client Eligibility Confirmation:</b>  ${strings.orEmpty(values.clientEligibility)}</p>
        <p><b>Service Provider Responsibility Attestation:</b>  ${strings.orEmpty(values.serviceProviderResponsibility)}</p>
        <p>${strings.orEmpty(values.serviceProviderName)} ACKNOWLEDGES AND AGREES:</p>
        <ol style={{listStyleType:"decimal"}}>
        <li>To advise the Ministry of Social Development and Poverty Reduction ("MSDPR") of the outcome of the individual’s participation in the approved training described in this application, in the form and manner requested by the MSDPR; </li>
        <li>If ${strings.orEmpty(values.clientName)} does not complete the approved eligible training described in this application to the satisfaction of ${strings.orEmpty(values.serviceProviderName)}, to:</li>
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