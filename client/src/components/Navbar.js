import React, { useEffect } from "react";
import gavel from "../images/gavgav.png";
import { createRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar() {
  const searchRef = createRef();
  const [showSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([]);
  const [clear, setClear] = useState(0);

  useEffect(() => {
    searchRef.current.value = "";
  }, [clear]);

  function search() {
    axios
      .get("/api/v1/videos/tag/" + searchRef.current.value)
      .then((res) => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }

  function clearform() {
    setData([]);
    setClear(clear + 1);
  }

  return (
    <div className="navBar">
      <Link to="/">
        <div className="titleBox">
          <img src={gavel} />

          <div>DEBATE VIDEO</div>
        </div>
      </Link>

      <div className="search">
        <Link to="/upload">
          {" "}
          <button className="upload">Upload </button>{" "}
        </Link>
        <div>
          <input placeholder="Search..." ref={searchRef} onChange={search} />
          {data.length > 0 && (
            <div className="sResults">
              {data.map((result, index) => {
                return (
                  <Link
                    onClick={clearform}
                    to={"/video/" + result._id}
                    key={index}
                  >
                    <div className="iResult">
                      <img className="tiny" src={result.thumbnail} />
                      <div>{result.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {showSearch === false && (
        <div className="toggle">
          <Link to="/upload">
            {" "}
            <span className="under">Upload </span>{" "}
          </Link>
          <span onClick={() => setShowSearch(true)}>Search </span>
        </div>
      )}

      {showSearch === true && (
        <div className="searchHid">
          <input placeholder="Search..." ref={searchRef} onChange={search} />
        </div>
      )}
    </div>
  );
}
