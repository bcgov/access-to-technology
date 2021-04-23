var strings = require("./strings")
var formatDate = require("../utils/formatDate")

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
        <h2>Access To Technology Application</h2>
        <p>Application ID:  ${strings.orEmpty(values._id)}</p>
        <p>Referring Ministry:  ${strings.orEmpty(values.fundingSource)}</p>
        <p>Service Provider Name:  ${strings.orEmpty(values.serviceProviderName)}</p>
        <p>Service Provider Postal:  ${strings.orEmpty(values.serviceProviderPostal)}</p>
        <p>Service Provider Contact:  ${strings.orEmpty(values.serviceProviderContact)}</p>
        <p>Contact Phone Number:  ${strings.orEmpty(values.serviceProviderPhone)}</p>
        <p>Contact Email:  ${strings.orEmpty(values.serviceProviderEmail)}</p>
        <p>Contract Reference ID:  ${strings.orEmpty(values.providerContractId)}</p>

        <hr />
        <h5>Program Eligibility </h5>
         <p>Eligible Skills Training Program:  ${strings.orEmpty(values.trainingProgram)}</p>
         <p>Training Program Start Date:  ${strings.orEmpty(values.periodStart1)}</p>
         <p>Training Program End Date:  ${strings.orEmpty(values.periodEnd1)}</p>
        <h5>Client Eligibility</h5>
         <p>Client is unemployed or precariously employed:  ${strings.orEmpty(values.unemployed)}</p>
         <p>Client is receiving at least one of the following forms of government assistance (choose all that apply): <br/>  ${strings.orEmpty(values.BCEAorFederalOnReserve.join('<br/>'))}</p>
         <hr />

        <h5>Client Information</h5>
        ${fundedSDPR ? (
            `<p>WorkBC Case Number:  ${strings.orEmpty(values.workBCCaseNumber)}</p>`
         ) : (``) 
         }
        <p>Client First Name:  ${strings.orEmpty(values.clientName)}</p>
        <p>Client Last Name:  ${strings.orEmpty(values.clientLastName)}</p>
        <p>Client Middle Name:  ${strings.orEmpty(values.clientMiddleName)}</p>
        <p>E-mail Address:  ${strings.orEmpty(values.clientEmail)}</p>
        <p>Phone Number:  ${strings.orEmpty(values.clientPhone)}</p>
        <p>Street Address 1:  ${strings.orEmpty(values.clientAddress)}</p>
        <p>Street Address 2:  ${strings.orEmpty(values.clientAddress2)}</p>
        <p>City/Town:  ${strings.orEmpty(values.clientCity)}</p>
        <p>Province:  ${strings.orEmpty(values.clientProvince)}</p>
        <p>Postal Code:  ${strings.orEmpty(values.clientPostal)}</p>
        <p>Client Qualifies for Telus Internet for Good:  ${strings.orEmpty(values.telusInternetForGood)}</p>
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
        <p>Service Provider Responsibility Attestation:  ${strings.orEmpty(values.serviceProviderResponsibility)}</p>`
       
        return html
    },


}