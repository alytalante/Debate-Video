import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function SingleVideo() {
  const [data, setData] = useState(undefined);
  const params = useParams();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/videos/" + params.id)
      .then((res) => {
        console.log(res.data.video);
        setData(res.data.video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/videos/" + params.id)
      .then((res) => {
        console.log(res.data.video);
        setData(res.data.video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <div className="vidMain">
      {data !== undefined && (
        <div className="vidLoaded">
          <h1>{data.name}</h1>
          <div
            className="player"
            dangerouslySetInnerHTML={{ __html: data.embed }}
          ></div>

          <div className="roundInfo">
            <h2>Round Info</h2>
            <div>
              <strong>Affirmative Team: </strong>
              {data.aff}
            </div>
            <br />
            <div>
              <strong>Negative Team: </strong>
              {data.neg}
            </div>
            <br />
            <div>
              <strong>Tournament: </strong>
              {data.tournament}
            </div>
            <br />
            <strong>Tags: </strong>
            <br />
            <br />

            <div className="tagFlex">
              {data.tags.map((tag, index) => {
                return (
                  <div className="tag" key={index}>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
