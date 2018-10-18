import React from 'react';
import './Home.css';
import '../../App.css';
import Slideshow from "react-slidez";
import Logo from '../../images/mylogo2.png'


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: ['https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/SdAO6Qg/videoblocks-close-up-of-a-couple-holding-hands-across-the-table-on-a-coffee-date_bf2wymc3e_thumbnail-full01.png',
                'https://media.swncdn.com/cms/CW/faith/41207-friends-with-sparklers-1200.1200w.tn.jpg',
                'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9b9cb51ea58b136b1ccfc012192afcc&w=1000&q=80',
                'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=044e5d85cd16e79671287971a06be066&w=1000&q=80'
            ],
        }
    }

    render() {
        const { images } = this.state;
        return (
            <div>
                <Slideshow
                    slides={images}
                    showArrows={false}
                    slideInterval={4500}
                    enableKeyboard={false}
                />
                <div className="div-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="div-home-heading">
                    <div className="heading-child">
                        Match. Chat. Meet.
                    </div>
                    <div className="heading-child1">
                        Come for what you love. <br />
                        Stay for what you discover.
                    </div>
                    <div className="heading-child2">
                        <div className="get-started-btn">
                            Get Started
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;