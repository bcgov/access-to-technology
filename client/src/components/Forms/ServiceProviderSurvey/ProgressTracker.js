import React, {Component} from 'react'

class ProgressTracker extends Component {
    render(){
        let classNameStep1 = "progress-step"
        let classNameStep2 = "progress-step"
        if (this.props.currentStep === 1){
            classNameStep1 += " is-active"
        } else if (this.props.currentStep === 2){
            classNameStep1 += " is-complete"
            classNameStep2 += " is-active"
        } 
        return (
            <ul className="progress-tracker progress-tracker--text progress-tracker--center" style={{marginTop: "0", marginBottom: "1rem"}}>
                <li className={classNameStep1}>
                    <div className="progress-marker"></div>
                    <div className="progress-text">
                        <h4 className="progress-title">Step 1</h4>
                        Application process
                    </div>
                </li>
                <li className={classNameStep2}>
                    <div className="progress-marker"></div>
                    <div className="progress-text">
                        <h4 className="progress-title">Step 2</h4>
                        Program Efficacy
                    </div>
                </li>
            </ul>
        )
    }
}

export default ProgressTracker