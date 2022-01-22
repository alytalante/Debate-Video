import React, { createRef, useEffect, useState } from "react";
import axios from "axios";

export default function SimpleUpload() {
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

  return (
    <div className="page">
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
    </div>
  );
}
