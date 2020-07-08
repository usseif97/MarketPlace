import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

export default useAPI = (reference) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    try {
      setLoading(true); // start Loading Data
      const response = await firebase
        .database()
        .ref(reference)
        .on("value", (data) => {
          setData(Object.values(data.val()));
          //console.log(data.toJSON());
        });
      setLoading(false); // Finish Loading Data
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return { data, error, loading, request };
};
