import React from "react";
import { useParams } from "react-router-dom";
import ClassPage from "./ClassPage";

const ClassPageWrapper = () => {
  const { className } = useParams();
  return <ClassPage className={className} />;
};

export default ClassPageWrapper;