import React from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import OnlineStatusMock from './OnlineStatusMock';
import './App.css';

/* 
Feel free to edit this all. If you don't need the HoC, go remove it. 
If you wish to save the state somewhere else, go for it. 
Just keep rendering <OnlineStatusMock /> 
*/

const withOnlineStatus = WrappedComponent =>
  class WithOnlineStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: false, time: 0 };
    }
    render() {
      const { isOnline, time } = this.state;
      return (
        <>
          <OnlineStatusMock
            onIsOnlineChange={isOnline => {
              if (this.state.isOnline !== isOnline) {
                this.setState({ isOnline, time : new Date().getTime() })}
              }
            }
          />
          <WrappedComponent {...this.props} isOnline={isOnline} time={time} />
        </>
      );
    }
  };

class App extends React.Component {
  componentDidUpdate({isOnline, time}) {
    if (new Date().getTime() - time > 2000) {
      NotificationManager.info(!isOnline ? 'Online' : 'Offline');
    }
  }

  render() {
    const { isOnline } = this.props;
    return (
      <>
        <div className={isOnline ? 'online' : 'offline'}>
          {isOnline ? 'Online' : 'Offline'}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default withOnlineStatus(App);
