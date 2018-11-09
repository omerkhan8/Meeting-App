import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class Biodata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: null,
            number: null,
            error: false
        }
    }

    submit() {
        const { nickName, number } = this.state;
        if (nickName === null || nickName === "" || number === null || number === "") {
            this.setState({ error: true })
        }
        else {
            let bioObj = { nickName, number };
            this.props.bioNext(bioObj);
            this.setState({ error: false })
        }
    }

    render() {
        const { error } = this.state;
        return (
            <div>
                <FormGroup bsSize="large">
                    <FormControl type="text" placeholder="Nick Name" onChange={(e) => { this.setState({ nickName: e.target.value }) }} />
                </FormGroup>
                <FormGroup bsSize="large">
                    <FormControl type="number" placeholder="Phone #" onChange={(e) => { this.setState({ number: e.target.value }) }} />
                </FormGroup>
                {error && <p className="validation-error">Please fill the empty fields*</p>}

                <div>
                    <div className="pf-next-btn" onClick={() => this.submit()}>
                        Next
                    </div>
                </div>

            </div>
        )
    }

}

export default Biodata;