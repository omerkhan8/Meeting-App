import React from 'react';
import '../App.css';
import { Checkbox } from 'react-bootstrap';

class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            avatar: ['https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-exlarge-169.jpg',
                'http://v.img.com.ua/b/orig/e/59/73633d107460cdbb244d02a52ed6e59e.jpg',
                'http://www.alcatraz.co.uk/wp-content/uploads/2015/09/cocktails-at-joes-at-east.jpg'],
            Beverages: ['coffee', 'juice', 'cocktail'],
            condition: [false, false, false],
            selectedBeverages: [],
            selectedDuration: [],
            error: false
        }
    }

    select(currentIndex, e) {
        let { selectedBeverages, condition } = this.state;
        const select = e.currentTarget.id;
        if (condition[currentIndex]) {
            condition[currentIndex] = false;
            let item = selectedBeverages.indexOf(select);
            selectedBeverages.splice(item, 1);
            this.setState({ condition, selectedBeverages });
        }
        else {
            condition[currentIndex] = true;
            selectedBeverages.push(select);
            this.setState({ condition, selectedBeverages });
        }

    }

    check(e) {
        let { selectedDuration } = this.state;
        if (e.target.checked) {
            selectedDuration.push(e.target.value);
            this.setState({ selectedDuration });
        }
        else {
            let item = selectedDuration.indexOf(e.target.value);
            selectedDuration.splice(item, 1);
            this.setState({ selectedDuration });
        }
    }

    submit() {
        const { selectedBeverages, selectedDuration } = this.state;
        if (selectedBeverages.length === 0 || selectedDuration.length === 0) {
            this.setState({ error: true })
        }
        else {
            this.props.detailNext(selectedBeverages, selectedDuration);
            this.setState({ error: false })
        }

    }

    render() {
        const { avatar, Beverages, condition, error } = this.state;
        const style = {
            borderStyle: 'solid',
            borderWidth: '5px',
            borderColor: '#FD3873'
        }
        console.log(this.state);
        return (
            <div>
                <div className="det-heading-div"><li> Select Beverages you like (you can choose more than one) </li></div>
                <div>
                    {
                        avatar.map((items, indx) => {
                            return (

                                condition[indx] ?
                                    <div className="w3container custom-responsive-card" style={style} id={Beverages[indx]} onClick={(e) => this.select(indx, e)} key={indx + Math.random().toString().substr(0, 6)}>
                                        <img src={items} alt="Avatar" className="w3image" style={{ width: '100%' }} />
                                        <div className="w3middle">
                                            <div className="w3text">{Beverages[indx]}</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="w3container custom-responsive-card" id={Beverages[indx]} onClick={(e) => this.select(indx, e)} key={indx + Math.random().toString().substr(0, 6)}>
                                        <img src={items} alt="Avatar" className="w3image" style={{ width: '100%' }} />
                                        <div className="w3middle">
                                            <div className="w3text">{Beverages[indx]}</div>
                                        </div>
                                    </div>
                            )
                        })
                    }

                </div>
                <div style={{ clear: 'both' }}></div>
                <div>
                    <div className="det-heading-div" style={{ marginTop: '10px' }}><li>Duration of meeting?</li></div>
                    <div style={{ fontSize: '1.2em' }}>
                        <Checkbox value="20 Minutes" onChange={(e) => this.check(e)}>20 Minutes</Checkbox>
                        <Checkbox value="60 Minutes" onChange={(e) => this.check(e)}>60 Minutes</Checkbox>
                        <Checkbox value="120 Minutes" onChange={(e) => this.check(e)}>120 Minutes</Checkbox>
                    </div>
                </div>
                {error && <div><p className="validation-error">Please select atleast one from both*</p></div>}
                <div>
                    <div className="pf-next-btn" onClick={() => this.submit()}>
                        Next
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;



// let selectedDiv = e.currentTarget;
// let Beverage = selectedDiv.id;
// let { selectedBeverages } = this.state;
// if (selectedDiv.style.borderStyle) {
//     selectedDiv.style.borderStyle = "";
//     selectedDiv.style.borderWidth = "";
//     selectedDiv.style.borderColor = "";
//     let indx = selectedBeverages.indexOf(Beverage);
//     selectedBeverages.splice(indx, 1);
//     this.setState({ selectedBeverages });
// }
// else {
//     selectedDiv.style.borderStyle = "solid";
//     selectedDiv.style.borderWidth = "5px";
//     selectedDiv.style.borderColor = "#FD3873";
//     selectedBeverages.push(Beverage);
//     this.setState({ selectedBeverages });
// }