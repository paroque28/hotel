import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Form from 'react-bootstrap/Form';

class FaceReviewerBase extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    this.props.firebase.photos()
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <Form>
          <h4>AI Automatic Reviewer:</h4>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} width="400" alt="avatar" />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={this.props.firebase.photos()}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </Form>
      </div>
    );
  }
}
const FaceReviewer 
 = compose(
  withFirebase,
)(FaceReviewerBase);

export default FaceReviewer;
