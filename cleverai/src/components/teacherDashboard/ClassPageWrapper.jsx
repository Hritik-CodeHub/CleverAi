import React from "react";
import { useParams } from "react-router-dom";
import ClassPage from "./ClassPage";
import { useSelector } from "react-redux";
const ClassPageWrapper = () => {
  const { className } = useParams();
  const _id = useSelector((state) => state.classInfo.selectedClassId);
  return <ClassPage className={className} _id={_id}/>;
};

export default ClassPageWrapper;