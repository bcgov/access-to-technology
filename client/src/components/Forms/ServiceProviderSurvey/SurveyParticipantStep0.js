import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import { MonthPickerField } from '../shared/DatePickerField'

class SurveyParticipantStep0 extends Component {
    handleWorkExperience() {
        if (this.props.values.hasStartedWorkExperience === "yes") {
            return (
                <div>
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="workExperienceStartDate">When did you start your work experience? <span
                            style={{ color: "red" }}>*</span></label>
                        <MonthPickerField
                            name="workExperienceStartDate"
                            className={`form-control ${feedBackClassName(this.props.errors, this.props.touched, "workExperienceStartDate")}`}
                        />
                        {feedBackInvalid(this.props.errors, this.props.touched, "workExperienceStartDate")}
                    </div>
                </div>
            )
        } else if (this.props.values.hasStartedWorkExperience === "no"){
            return (
                <div>
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
        return null
    }

    render() {
        if (this.props.currentStep !== 0) {
            return null
        }
        //return step 0
        return (
            <div>
                <h1>Initial Question</h1>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="hasStartedWorkExperience">Have you started your work experience?<span
                        style={{ color: "red" }}>*  </span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "hasStartedWorkExperience")}`}
                            type="radio"
                            name="hasStartedWorkExperience"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="hasStartedWorkExperienceYes">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "hasStartedWorkExperience")}`}
                            type="radio"
                            name="hasStartedWorkExperience"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="hasStartedWorkExperienceNo">No</label>
                        {feedBackInvalid(this.props.errors, this.props.touched, "hasStartedWorkExperience")}
                    </div>
                </div>
                {this.handleWorkExperience()}
            </div>
        )
    }
}
export default SurveyParticipantStep0