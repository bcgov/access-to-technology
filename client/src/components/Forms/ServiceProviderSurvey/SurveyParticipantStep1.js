import React, { Component } from 'react'
import { Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'

class SurveyParticipantStep1 extends Component {

    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        //else return step 1
        return (
            <div>
                <p>Thinking back about the <b>online application process,</b> please rate your level of agreement with the following statements:</p>
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
                        <div className="form-check form-check-inline col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                                type="radio"
                                name="easeOfApplicationCompletion"
                                value="1stronglyDisagree"
                            />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check form-check-inline col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                                type="radio"
                                name="easeOfApplicationCompletion"
                                value="2disagree"
                            />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check form-check-inline col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                                type="radio"
                                name="easeOfApplicationCompletion"
                                value="3neitherAgreeNorDisagree"
                            />
                            <label className="form-check-label">3</label>
                        </div>
                        <div className="form-check form-check-inline col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                                type="radio"
                                name="easeOfApplicationCompletion"
                                value="4agree"
                            />
                            <label className="form-check-label">4</label>
                        </div>
                        <div className="form-check form-check-inline col">
                            <Field
                                className={`form-check-input ${feedBackClassName(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}`}
                                type="radio"
                                name="easeOfApplicationCompletion"
                                value="5stronglyAgree"
                            />
                            <label className="form-check-label">5</label>
                            {feedBackInvalid(this.props.errors, this.props.touched, "easeOfApplicationCompletion")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="experienceOnlineApplicationComments">Please provide any additional details or comments about your experience with the online application process.
                </label>
                    <small className="text-muted" id="experienceOnlineApplicationComments"> (1000 characters max.)</small>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="experienceOnlineApplicationComments"
                        name="experienceOnlineApplicationComments"
                        rows="4"
                        maxLength="1000"
                    />
                    <small>{this.props.values.experienceOnlineApplicationComments.length}/1000</small>
                </div>
            </div>
        )
    }
}

export default SurveyParticipantStep1