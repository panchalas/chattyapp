import React, {Component} from 'react';

export default class ChatBar extends Component {
  render() {
    let username = this.props.currentUser.name;
    let oldUsername = username;

    const handleOnKeyPress = (event) => {
      if(event.key === 'Enter') {
        switch(event.target.name) {
          case 'message':
            let content = event.target.value;
            let addNewMessage = this.props.addNewMessage;
            username = document.getElementById('uname').value;
            let colorCode =this.props.colorCode;
            if(content.trim() === '') {
              alert('Empty message');
            } else {
              addNewMessage({type: 'postMessage', username: username, content: content, color: colorCode});
              event.target.value='';
            }
            event.target.focus();
            break;
          case 'usrname':
            if(event.target.value.trim() === '') {
              alert('Username cannot be empty!');
              event.target.value = username;
            } else {
              username = event.target.value;
              let colorCode =this.props.colorCode;
              //incase if the user changes the user name which is different than the current user name
              if(oldUsername !== username) {
                let content = `*** ${oldUsername} *** changed their name to *** ${username} ***`;
                let addNewMessage = this.props.addNewMessage;
                addNewMessage({type: 'postNotification', username: username, content: content, color: colorCode});
              }
            }
            event.target.focus();
            break;
        }
      }
    }

    const handleOnFocus = () => {
      oldUsername = document.getElementById('uname').value;
    }

    const handleOnBlur = (event) => {
      if(oldUsername !== event.target.value) {
        event.target.value = oldUsername;
      }
    }

    return (
      <footer className='chatbar'>
        <input className='chatbar-username' name="usrname" id="uname" placeholder='Your Name (Optional)' defaultValue={username} onKeyPress={handleOnKeyPress} onFocus={handleOnFocus} onBlur={handleOnBlur} />
        <input className='chatbar-message' name="message" placeholder='Type a message and hit ENTER' onKeyPress={handleOnKeyPress} />
      </footer>
    );
  }
}
