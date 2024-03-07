import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner">
        <div className="spinner__item spinner__item--01"></div>
        <div className="spinner__item spinner__item--02"></div>
        <div className="spinner__item spinner__item--03"></div>
      </div>
    </div>
  );
};

export default Loading;
