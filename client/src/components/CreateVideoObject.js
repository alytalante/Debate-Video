import React, { createRef, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { set } from "mongoose";

export default function CreateVideoObject() {
  const [video, setVideo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoCorrect, setIsVideoCorrect] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("");
  const [exists, setExists] = useState(false);

  const urlInput = createRef();

  const tagsRef = createRef();
  const affRef = createRef();
  const negRef = createRef();
  const tournRef = createRef();

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
        setVideo(res.data.items[0]);
        setTimeout(() => {
          setIsLoaded(true);
          doesItExist(res.data.items[0].id);
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doesItExist = (id) => {
    axios
      .get("/api/v1/videos/yt/" + id)
      .then((res) => {
        setExists(res.data.exists);
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

    if (video.snippet.description === "") {
      newVideo.description = "no description entered";
    } else {
      newVideo.description = video.snippet.description;
    }
    newVideo.aff = affRef.current.value;
    newVideo.neg = negRef.current.value;
    newVideo.tags = cleanArray();
    newVideo.tournament = tournRef.current.value;

    axios
      .post("api/v1/videos", newVideo)
      .then((res) => {
        setTimeout(() => {
          setUrl(res.data.video._id);
        }, 200);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError("All fields must be entered!");
      });
  };
  function cleanArray() {
    let tagsArray = tagsRef.current.value.split(",");
    let cleanArray = [];
    tagsArray.forEach((tag) => {
      let newTag = tag.replace(" ", "");
      cleanArray.push(newTag);
    });
    return cleanArray;
  }

  return (
    <div className="page">
      {isLoaded === false && (
        <>
          {" "}
          <form onSubmit={createVideo} className="submitform">
            <h3>Weclome</h3>
            <p> Thank you for choosing to submit to Debate Video. </p>
            <p> This page will walk you through the video upload process.</p>
            <label>Enter video youtube URL: </label>
            <br />
            <input ref={urlInput} />
            <br />
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
                <h3 className="head">{video.snippet.localized.title}</h3>
              </div>
            </div>
          </div>
          {exists === false && (
            <div className="confirm">
              <p>Looks like this is your video.</p>
              <div>
                <button onClick={confirmCorrect}>Continue</button>
              </div>
            </div>
          )}
          {exists === true && (
            <div className="confirm">
              <p>This video has already been uploaded.</p>
            </div>
          )}
        </>
      )}
      {isVideoCorrect === true && success === false && (
        <form onSubmit={postVideo} className="submitform wide">
          <h3>Lets go ahead and enter some information on this video!</h3>

          <label>Enter tags (separate by commas):</label>
          <textarea ref={tagsRef} />
          <br />
          <label>
            Affirmative team name (Format should be "School - Initial/Initial",
            i.e. "Utah C/J"):
          </label>
          <input ref={affRef} />
          <br />
          <label>
            Negative team name (Format should be "School - Initial/Initial",
            i.e. "Utah C/J"):
          </label>
          <input ref={negRef} />
          <br />
          <label>
            Tournament name (format should be "name- year", i.e. "NPTE 2018"):
          </label>
          <input ref={tournRef} />
          <br />
          {error !== false && (
            <div className="error">
              <strong>ERROR: </strong>
              {error}
            </div>
          )}
          <br />
          <button>Upload</button>
        </form>
      )}
      {success === true && (
        <div>
          <h1>Congrats!</h1>
          <p>
            Your video has been successfully uploaded. It is available{" "}
            <Link to={`/video/` + url}>here</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
