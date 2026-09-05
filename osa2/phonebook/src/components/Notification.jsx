const Notification = ({ notification }) => {
  if (notification === null) {
    return null;  // jos notification on null, ei näytetä mitään
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.text}
    </div>
  );
};

export default Notification;
