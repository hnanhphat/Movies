import { useState } from "react";
import './Notification.scss';

const Notification = () => {
  const [showNoti, setShowNoti] = useState(true);

  return (
    <div className={`modal ${showNoti && "modal--active"}`}>
      <div className="modal-backdrop"></div>
      <div className="modal-dialog">
        <div className="md-header">
          <div className="md-header__ttl">Notification</div>
          <button
            className="md-header__close"
            onClick={() => {
              setShowNoti(false);
            }}
          >
            ×
          </button>
        </div>
        <div className="md-body">
          <p className="md-body__txt">
            <strong>No Internet</strong>
            Try:
            <br />
            - Checking the network cables, moderm, and router
            <br />
            - Reconnecting to Wi-fi
            <br />- Running Windows Network Diagnostics
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
