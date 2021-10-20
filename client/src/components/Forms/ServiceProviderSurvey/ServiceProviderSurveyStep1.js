import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class ServiceProviderSurveyStep1 extends Component {

    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        //else return step 1
        return (
            <div>
            <p>Please rate your level of agreement with the following statements:</p>
            <p>The rating scale used is as follows: 1 = strongly disagree, 2 = disagree, 3 = neither agree nor disagree, 4 = agree, 5 = strongly agree.</p>
            <hr />
            <div className="form-group">
            <div className="row">
                    <div className="col-6"></div>
                    <div className="col d-none d-md-block">
                        Strongly <br /> Disagree
                        </div>
                    <div className="col">

                    </div>
                    <div className="col">

                    </div>
                    <div className="col">

                    </div>
                    <div className="col d-none d-md-block">
                        Strongly<br /> Agree
                        </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <label className="control-label" htmlFor="easeOfApplicationCompletion">The application process was easy to complete.<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                            type="radio"
                            name="easeOfApplicationCompletion"
                            value="1"
                        />
                        <label className="form-check-label">1</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                            type="radio"
                            name="easeOfApplicationCompletion"
                            value="2"
                        />
                        <label className="form-check-label">2</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                            type="radio"
                            name="easeOfApplicationCompletion"
                            value="3"
                        />
                        <label className="form-check-label">3</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                            type="radio"
                            name="easeOfApplicationCompletion"
                            value="4"
                        />
                        <label className="form-check-label">4</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                            type="radio"
                            name="easeOfApplicationCompletion"
                            value="5"
                        />
                        <label className="form-check-label">5</label>
                        {feedBackInvalid(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}
                    </div>
                </div>
            </div>
            {(this.props.values.cohort === 1) &&
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <label className="control-label" htmlFor="applicationProcessingSpeed">My organization is satisfied with the speed of how

quickly the applications were processed.<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "applicationProcessingSpeed")}`}
                            type="radio"
                            name="applicationProcessingSpeed"
                            value="1"
                        />
                        <label className="form-check-label">1</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "applicationProcessingSpeed")}`}
                            type="radio"
                            name="applicationProcessingSpeed"
                            value="2"
                        />
                        <label className="form-check-label">2</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "applicationProcessingSpeed")}`}
                            type="radio"
                            name="applicationProcessingSpeed"
                            value="3"
                        />
                        <label className="form-check-label">3</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "applicationProcessingSpeed")}`}
                            type="radio"
                            name="applicationProcessingSpeed"
                            value="4"
                        />
                        <label className="form-check-label">4</label>
                    </div>
                    <div className="form-check col">
                        <Field
                            className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "applicationProcessingSpeed")}`}
                            type="radio"
                            name="applicationProcessingSpeed"
                            value="5"
                        />
                        <label className="form-check-label">5</label>
                        {feedBackInvalid(this.props.errors, this.props.touched, "applicationProcessingSpeed")}
                    </div>
                </div>
            </div>
            }
            <div className="form-group">
                <label className="col-form-label control-label" htmlFor="otherTrainingProgramsSuggestions">What other online or blended training programs

that are not currently eligible for Access to Technology

(A2T) could benefit from receiving a laptop through this

initiative?
            </label>
                <small className="text-muted" id="otherTrainingProgramsSuggestions"> (200 characters max.)</small>
                <Field
                    as="textarea"
                    className="form-control"
                    id="otherTrainingProgramsSuggestions"
                    name="otherTrainingProgramsSuggestions"
                    rows="2"
                    maxLength="200"
                />
                <small>{this.props.values.otherTrainingProgramsSuggestions.length}/200</small>
            </div>
            <div className="form-group">
                <label className="col-form-label control-label" htmlFor="overallExperienceWithOnlineApplicationProcess">Please provide any additional details or comments

about your organization’s experience with the online

application process.
            </label>
                <small className="text-muted" id="overallExperienceWithOnlineApplicationProcess"> (1000 characters max.)</small>
                <Field
                    as="textarea"
                    className="form-control"
                    id="overallExperienceWithOnlineApplicationProcess"
                    name="overallExperienceWithOnlineApplicationProcess"
                    rows="4"
                    maxLength="1000"
                />
                <small>{this.props.values.overallExperienceWithOnlineApplicationProcess.length}/1000</small>
            </div>
        </div>

        )
    }
}

export default ServiceProviderSurveyStep1