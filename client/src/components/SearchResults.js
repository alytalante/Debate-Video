import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const params = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/videos/tag/" + params.query.replace(/#|%/g, " "))
      .then((res) => {
        setVideos(res.data.videos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="blueHeader">
        Search Results for "{params.query.replace(/#|%/g, " ")}"{" "}
      </h2>
      <hr />
      {videos !== undefined && (
        <div>
          {videos.map((video, index) => {
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
          })}
        </div>
      )}
    </div>
  );
}
