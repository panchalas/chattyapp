import React, {Component} from 'react';

export default class TotalUsersOnline extends Component {
  render() {

      return (
        <div>
          <span className='user-status' id='totalusers'>
               {this.props.connections} Users Online
          </span>
        </div>
      );
  }
}
