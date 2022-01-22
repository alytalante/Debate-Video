import React, { createRef, useEffect, useState } from "react";
import axios from "axios";

export default function CreateVideoObject() {
  const [video, setVideo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoCorrect, setIsVideoCorrect] = useState(false);
  const urlInput = createRef();

  const tagsRef = createRef();
  const affRef = createRef();
  const negRef = createRef();

  const createVideo = (e) => {
    e.preventDefault();
    let stringy = urlInput.current.value;
    let array = stringy.split("=");
    let id = array[1];

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=player&id=${id}&key=AIzaSyB4CopCo_s5sJLiPSB37j8VrPPjkrYQMMk`
      )
      .then((res) => {
        console.log(res.data.items[0]);
        setVideo(res.data.items[0]);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmCorrect = () => {
    setIsVideoCorrect(true);
  };

  const postVideo = (e) => {
    e.preventDefault();
    let tagsArray = tagsRef.current.value.split(",");
    let newVideo = {};
    newVideo.embed = video.player.embedHtml;
    newVideo.name = video.snippet.localized.title;
    newVideo.vidId = video.id;
    newVideo.thumbnail = video.snippet.thumbnails.high.url;
    newVideo.description = video.snippet.description;
    newVideo.aff = affRef.current.value;
    newVideo.neg = negRef.current.value;
    newVideo.tags = tagsArray;
    console.log(video);
    console.log(newVideo);

    axios
      .post("api/v1/videos", newVideo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page">
      {isLoaded === false && (
        <>
          {" "}
          <form onSubmit={createVideo} className="submitform">
            <p> Thank you for uploading this video to debate video! </p>
            <p>
              {" "}
              This page will walk you through the video upload process. Here are
              the steps to follow:
            </p>
            <label>Enter video youtube URL: </label>
            <input ref={urlInput} />
            <button onClick={createVideo}> Submit </button>
          </form>
        </>
      )}

      {isLoaded === true && isVideoCorrect === false && (
        <>
          <div className="vidPreview">
            <div className="flexLeft">
              <img src={video.snippet.thumbnails.high.url} />
            </div>
            <div className="flexRight">
              <div>
                <h4 className="head">{video.snippet.localized.title}</h4>
              </div>
              <div>
                <p className="description">
                  {video.snippet.description.substring(0, 270)}...
                </p>
              </div>
            </div>
          </div>
          <p>Does the video information above appear correct?</p>
          <div>
            <button onClick={confirmCorrect}>Yes</button>
            <button>No</button>
          </div>
        </>
      )}
      {isVideoCorrect === true && (
        <form onSubmit={postVideo}>
          Good. Lets go ahead and enter some information on this video!
          <div className="formSection">
            <label>Enter tags (separate by comma)</label>
            <textarea ref={tagsRef} />
          </div>
          <div className="formSection">
            <label>
              Please enter affirmative team name (Format should be "School -
              Initial/Initial", i.e. "Utah C/J")
            </label>
            <input ref={affRef} />
          </div>
          <div className="formSection">
            <label>
              Please enter negative team name (Format should be "School -
              Initial/Initial", i.e. "Utah C/J")
            </label>
            <input ref={negRef} />
          </div>
          <button>Upload</button>
        </form>
      )}
    </div>
  );
}
