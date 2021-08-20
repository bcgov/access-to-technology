import React, { Component } from 'react'
import { Field } from 'formik'

class SurveyParticipantStep4 extends Component {

    get showErrors() {
        if (this.props.submitCount > 0) {
            return (
                <div>
                    <p>Please correct the following errors:</p>
                    <ul>
                        {Object.values(this.props.errors).map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        if (this.props.currentStep !== 4) {
            return null
        }
        //else return step 4
        return (
            <div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="bestPartOfTheProgramComments">What do you feel has been the best part of the program so far?
                </label>
                    <small className="text-muted" id="bestPartOfTheProgramComments"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="bestPartOfTheProgramComments"
                        name="bestPartOfTheProgramComments"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.bestPartOfTheProgramComments.length}/1000</small>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="experienceBetterComments">How can we make your experience better? Please feel free to include any comments, suggestions, or feedback. 
                </label>
                    <small className="text-muted" id="experienceBetterComments"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="experienceBetterComments"
                        name="experienceBetterComments"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.experienceBetterComments.length}/1000</small>
                </div>
                <div className="form-group">
                    {this.showErrors}
                </div>
                <button
                    className="btn btn-success btn-block"
                    type="submit"
                    style={{ marginBottom: "2rem" }}
                    disabled={this.props.isSubmitting || this.props.hasError}
                >
                    {
                    this.props.isSubmitting ?
                        <div>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Submitting...
                        </div>
                        :
                        "Submit"

                    }                      
                
                </button>
            </div>
        )
    }
}

export default SurveyParticipantStep4