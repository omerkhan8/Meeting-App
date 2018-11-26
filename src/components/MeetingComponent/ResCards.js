import React from 'react';
import '../../screens/Meeting/Meeting.css';
import { Card, CardWrapper } from 'react-swipeable-cards';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";
import swal from 'sweetalert2';

class ResCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNav: true,
            height: '450px',
            cardWidth: '480px',
            criteriaUsers: props.criteriaUsers

        }
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.responsiveImages = this.responsiveImages.bind(this);
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
                this.setState({ showNav: true, height: '480px', cardWidth: '500px' })
            }
        })

    }

    responsiveImages() {

        let index = this.state.criteriaUsers.length;
        for (let i = 0; i !== index; i++) {
            var div = document.getElementById(`check${i}`);
            var img = div.getElementsByTagName('IMG');
            var divs = div.getElementsByTagName('DIV');
            for (let i = 0; i < 7; i++) {
                divs[i].style.height = "300px";
                // console.log(divs[i]);
            }

            for (let im of img) {
                im.style.width = '100%';
                im.style.height = 'auto';
                // console.log(i);
            }
        }
    }


    left(data, index) {
        console.log('lefttttttttt')
        if (typeof index === 'number') {
            const { criteriaUsers } = this.state;
            criteriaUsers.splice(index, 1);
            this.setState({ criteriaUsers })
        }
    }
    right(data) {
        console.log('rightttttttttttttt')

        swal({
            title: 'Are you sure?',
            text: `Do you want to meet with ${data.name}?`,
            type: 'info',
            customClass: 'custom-swal-meeting',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.value) {
                this.props.sendMeetingReq(data);
            }
        })


    }




    render() {

        const { showNav, criteriaUsers } = this.state;
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
                {criteriaUsers.map((values, index) => {
                    // console.log(values);
                    return (
                        <Card
                            key={values.uid}
                            style={customCard}
                            data={values}
                            onSwipeLeft={this.left}
                            onSwipeRight={this.right}
                        >
                            <div id={`check${index}`} style={{ width: '98%', margin: '0 auto' }} >
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
                            <div>
                                <div className="floatingBtn left" onClick={() => this.left(0, index)} >
                                    <i className="fa fa-remove res-card-btn" style={{ color: 'white', fontSize: '25px' }} ></i>
                                </div>
                                <div className="floatingBtn" onClick={() => this.right(values)} >
                                    <i className="fa fa-check res-card-btn" style={{ color: 'white', fontSize: '25px' }} ></i>
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


// fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=3&ll=${A},${B}`)

// fetch(`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&near=${query}`)