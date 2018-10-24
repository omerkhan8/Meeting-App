import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const Biodata = (props) => {

    return (
        <div>
            <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Nick Name" />
            </FormGroup>
            <FormGroup bsSize="large">
                <FormControl type="number" placeholder="Phone #" />
            </FormGroup>

            <div>
                <div className="pf-next-btn">
                    Next
                </div>
            </div>

        </div>
    )

}

export default Biodata;