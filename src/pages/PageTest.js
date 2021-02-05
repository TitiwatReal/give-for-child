import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageTest = () => {
  useEffect(() => {
    axios
      .get('/activities')
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRow(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [row]);

  const [row, setRow] = useState([]);
  setRow([0]);
  let data = row;
  return (
    <div>
      {data.map((v) => {
        return <p>{v.id}</p>;
      })}
    </div>
  );
};

export default PageTest;
