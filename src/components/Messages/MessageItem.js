import React, { Component } from 'react';

import Toast from 'react-bootstrap/Toast'

import Button from 'react-bootstrap/Button'

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        <hr/>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
           <Toast onClose={() => {if(authUser.uid === message.userId)onRemoveMessage(message.uid)}}>
            <Toast.Header>
              <strong className="mr-auto">{message.userId}</strong>
              <small> {message.editedAt && <span>(Edited)</span>}</small>
            </Toast.Header>
            <Toast.Body>{message.text}</Toast.Body>
          </Toast>

        )}

        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <Button onClick={this.onSaveEditText}>Save</Button>
                <Button onClick={this.onToggleEditMode}>Reset</Button>
              </span>
            ) : (
              <Button onClick={this.onToggleEditMode}>Edit</Button>
            )}

          </span>
        )}
      </li>
    );
  }
}

export default MessageItem;
