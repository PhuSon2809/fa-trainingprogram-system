import React from "react";
// import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const { id } = useParams();
  return <div>Class Id : {id}</div>;
};

export default ClassDetail;
