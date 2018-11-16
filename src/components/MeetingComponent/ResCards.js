import React from 'react';
import '../../screens/Meeting/Meeting.css';
import { Card, CardWrapper } from 'react-swipeable-cards';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

class ResCards extends React.Component {

    constructor() {
        super();
        this.state = {
            showNav: true,
            height: '500px',
            cardWidth: '500px'
        }
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
    }

    componentDidMount() {
        this.responsiveImages();
        if (window.screen.width <= 700) {
            this.setState({ showNav: false, height: '480px', cardWidth: '100%' });

        }
        let x = window.matchMedia("(max-width: 700px)");
        x.addListener((x) => {
            if (x.matches) {
                this.setState({ showNav: false, height: '480px', cardWidth: '100%' });

            }
            else {
                this.setState({ showNav: true, height: '500px', cardWidth: '500px' })
            }
        })

    }

    responsiveImages() {
        // console.log('working')
        var div = document.getElementById('check');
        var img = div.getElementsByTagName('IMG');
        var divs = div.getElementsByTagName('DIV');
        for (let i = 0; i < 7; i++) {
            divs[i].style.height = "300px";
            // console.log(divs[i]);
        }

        for (let i of img) {
            i.style.width = '100%';
            i.style.height = 'auto';
            // console.log(i);
        }
    }


    left() {
        alert('left');
        // this.responsiveImages();
    }
    right() {
        alert('right')
        // this.responsiveImages();

    }


    render() {
        console.log(this.state)
        const { showNav } = this.state;
        const { criteriaUsers } = this.props;
        const customCard = {
            backgroundColor: '#E9EBEE',
            backgroundSize: 'cover',
            height: this.state.height,
            width: '90%',
            transition: 'box-shadow .3s',
            borderStyle: 'solid',
            borderColor: 'Lightgrey',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 10px 30px rgba(0,0,0,0.23)',
            cursor: 'pointer',
            transformOrigin: 'bottom center',
        }

        return (
            <CardWrapper style={{ width: this.state.cardWidth }}>
                {criteriaUsers.map(values => {
                    console.log(values);
                    return (
                        <Card
                            key={values.uid}
                            style={customCard}
                            data={values}
                            onSwipeLeft={this.left}
                            onSwipeRight={this.right}
                        >
                            <div id="check" style={{ width: '98%', margin: '0 auto' }} >
                                <ImageGallery
                                    items={values.imagesArray}
                                    showThumbnails={false}
                                    showNav={showNav}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    showBullets
                                    disableArrowKeys
                                    slideDuration={800}
                                    onSlide={this.responsiveImages}
                                    autoPlay
                                    slideInterval={3500}
                                />
                            </div>
                            <div >
                                <div className="floatingBtn left" >
                                    <i className="fa fa-remove" style={{ color: 'white', fontSize: '25px' }} ></i>
                                </div>
                                <div className="floatingBtn" >
                                    <i className="fa fa-check" style={{ color: 'white', fontSize: '25px' }} ></i>
                                </div>
                                <div className="user-name-div">
                                    {values.name}
                                </div>
                                <div className="nickName-div">{values.nickName}</div>
                            </div>
                        </Card>
                    )
                })}
            </CardWrapper>

        )
    }
}

export default ResCards;