const VideoCard = ({ image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center w-[90%] mt-5">
        <div>
          <img src={image} alt="Card Image" className="h-[3rem]" />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-app-text">{title}</h2>
          <p className="text-app-muted mb-3">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-app-text text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
