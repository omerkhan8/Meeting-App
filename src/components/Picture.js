import React from 'react';
import { Thumbnail, ProgressBar } from 'react-bootstrap';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import '../App.css';


class Picture extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUploaded: [false, false, false],
            currIndex: null,
            isUploading: false,
            progress: null,
            imageUrl: ['https://react-bootstrap.github.io/thumbnaildiv.png'
                , 'https://react-bootstrap.github.io/thumbnaildiv.png',
                'https://react-bootstrap.github.io/thumbnaildiv.png']
        }

        // this.uploadStart = this.uploadStart.bind(this);
        this.progress = this.progress.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
    }

    uploadStart(indx) {
        this.setState({ progress: 0, isUploading: true, currIndex: indx })
    }

    progress(progress) {
        this.setState({ progress });
    }

    onUploadSuccess(filename) {
        let { imageUrl, imageUploaded, currIndex } = this.state;
        imageUploaded[currIndex] = true;
        firebase.storage().ref("images").child(filename).getDownloadURL()
            .then(url => {
                imageUrl[currIndex] = url;
                this.setState({ imageUrl, imageUploaded, isUploading: false, currIndex: null, progress: null })
            })
    }

    render() {
        const { imageUrl, isUploading, progress, currIndex, imageUploaded } = this.state;
        console.log(this.state);
        return (
            <div>
                {imageUrl.map((value, indx) => {
                    return (
                        <div className="custom-responsive-card" key={indx + Math.random().toString().substr(0, 6)}>
                            <Thumbnail src={value} alt="242x200" bsStyle="thumbnail cardWidth" >
                                {isUploading && currIndex === indx && <ProgressBar now={progress} label={`${progress}%`} />}
                                {!imageUploaded[indx] && !isUploading && <label className="pf-next-btn" style={{ backgroundColor: '#337ab7', width: '80px' }}  >
                                    Upload
                                        <FileUploader
                                        hidden
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={this.uploadStart.bind(this, indx)}
                                        onProgress={this.progress}
                                        onUploadSuccess={this.onUploadSuccess}
                                    />
                                </label>}
                            </Thumbnail>
                        </div>
                    )

                }

                )}

                <div style={{ clear: 'both' }}>
                    <div style={{ position: 'relative', top: '8px' }}>
                        <div className="pf-next-btn">
                            Next
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Picture;
