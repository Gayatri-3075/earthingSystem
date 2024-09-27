import React from "react";
import Image from "next/image";

const Loading = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="flex justify-center items-center">
      <Image
        src="/icons/LoadPole.gif"
        alt="Loading"
        width="500"
        height="500"
      />
    </div>
  );
};

export default Loading;
