import React from "react";
import { useParams } from "react-router-dom";
import ClassPage from "./ClassPage";
const ClassPageWrapper = () => {
  const { className,_id} = useParams();
  return <ClassPage className={className} _id={_id}/>;
};

export default ClassPageWrapper;