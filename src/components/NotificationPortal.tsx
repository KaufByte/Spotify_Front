import React from "react";
import ReactDOM from 'react-dom';
import '../components/NotificationPortal.css';



interface Notification{
    id:number;
    title:string;
    description:string;
    timestamp:string;
}

interface NotificationPortalProps{
    notifications:Notification[];
    onClose: () =>void;
}


const NotificationPortal: React.FC<NotificationPortalProps> = ({ notifications, onClose }) => {
    return ReactDOM.createPortal(
      <div className="notification-portal">
        <div className="notification-portal-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h3>What's New</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <h4>{notification.title}</h4>
                  <p>{notification.description}</p>
                  <small>{notification.timestamp}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications.</p>
          )}
        </div>
      </div>,
      document.getElementById('portal-root') as HTMLElement 
    );
  };
export default NotificationPortal;