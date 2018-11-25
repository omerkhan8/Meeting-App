import React from 'react';
import '../../screens/Dashboard/Dashboard.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import { Button, ButtonToolbar } from 'react-bootstrap';
import '../../../node_modules/react-accessible-accordion/dist/fancy-example.css';

class MeetingList extends React.Component {

    accept(values) {
        this.props.acceptReq(values);
    }

    getDirection(values) {
        this.props.getDirection(values);
    }

    cancel(values) {
        this.props.cancelReq(values);
    }

    render() {
        const { meetings, user, showButtons } = this.props;
        console.log(meetings)

        return (
            <div>
                <Accordion className="accordion ml-accordion-main">
                    {meetings.map(values => {
                        return (
                            <AccordionItem key={values[user].uid} >
                                <AccordionItemTitle>
                                    <div style={{ position: 'relative' }}>
                                        <div className="ml-avatar-div">
                                            <img src={values[user].imageUrl[0]} alt="display" />
                                        </div>
                                        <div className="ml-name-div">
                                            {values[user].name}
                                        </div>
                                        <br />
                                        <div className="ml-name-div1">
                                            {values.status === 'Pending' && <span>Status: <span style={{ color: '#FF6600' }}>{values.status}</span> </span>}
                                            {values.status === 'Accepted' && <span>Status: <span style={{ color: '#0B6623' }}>{values.status}</span> </span>}
                                            {values.status === 'Cancelled' && <span>Status: <span style={{ color: '#B80018' }}>{values.status}</span> </span>}

                                        </div>
                                        <i className="fa fa-angle-down" style={{ float: 'right', fontSize: '25px', position: 'absolute', right: '0', top: '25px' }}></i>
                                        <div style={{ clear: 'both' }}></div>
                                    </div>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <div className="ml-body-div">
                                        <p><span>Meeting Time:</span> {values.choosedTime}</p>
                                        <p><span>Location:</span> {`${values.choosedPlace.name}, ${values.choosedPlace.location.address}`}</p>
                                        {showButtons && <p><span>Duration:</span> {values[user].selectedDuration[0]}</p>}
                                    </div>
                                    {showButtons &&
                                        <div className="ml-btn-div">
                                            <ButtonToolbar>
                                                <Button bsStyle="success" bsSize="large" block onClick={() => this.accept(values)}>Accept</Button>
                                                <Button bsStyle="primary" bsSize="large" block onClick={() => this.getDirection(values)}>Get Direction</Button>
                                                <Button bsStyle="danger" bsSize="large" block onClick={() => this.cancel(values)}>Cancel</Button>
                                            </ButtonToolbar>
                                        </div>
                                    }
                                </AccordionItemBody>
                            </AccordionItem>
                        )
                    })
                    }
                </Accordion>
            </div>
        )
    }
}

MeetingList.defaultProps = {
    user: 'requestedUser',
    showButtons: false
}

export default MeetingList;