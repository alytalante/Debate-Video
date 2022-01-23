import axios from "axios";
import { set } from "mongoose";
import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState(undefined);
  const searchRef = createRef("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/videos")
      .then((res) => {
        setVideos(res.data.videos);
      })
      .catch((err) => {});
  }, []);

  const handleSearchChange = () => {
    setUrl(searchRef.current.value);
  };

  return (
    <div>
      <div className="about">
        <h1>Welcome to Debate Video</h1>
        <p>
          This website is dedicated to archiving videos of debates in the
          National Parliamentary Debate Associastion format.{" "}
        </p>
        <p>
          We welcome contributions from anyone who has access to recordings of
          debate rounds. All that you need to do is upload the round to youtube
          and then follow the instructions on our{" "}
          <Link to="/upload">upload page</Link> to add it to this site.
        </p>
      </div>
      <h2 className="blueHeader">Search</h2>
      <hr />
      <div className="homeSearch">
        <p>You may search by tag, team name, or tournament name.</p>
        <div className="homeSR">
          <input onChange={handleSearchChange} ref={searchRef} />
          <Link to={"/search/" + url}>
            <button>Search</button>
          </Link>
        </div>
      </div>

      <h2 className="blueHeader">Videos</h2>
      <hr />
      {videos !== undefined && (
        <div>
          {videos.map((video, index) => {
            if (index < 15) {
              return (
                <div key={index} className="video">
                  <img src={video.thumbnail} />

                  <div className="vr">
                    <h2>{video.name}</h2>
                    <div>
                      <strong>Aff: </strong>
                      {video.aff}
                      <strong>Neg: </strong> {video.neg}
                    </div>
                    <div>
                      <strong>Tournament: </strong> {video.tournament}
                    </div>
                    <Link to={`/video/` + video._id}>
                      <button className="specbutton">Click To Watch</button>
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
