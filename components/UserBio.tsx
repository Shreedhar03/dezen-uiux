import React from "react";

const UserBio = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col justify-center items-center w-min">
          <h2 className="text-5xl">45</h2>
          <p className="text-2xl">Followers</p>
        </div>
        <p className="mx-6">X</p>
        <div className="flex flex-col justify-center items-center w-min">
          <h2 className="text-5xl">21</h2>
          <p className="text-2xl">Following</p>
        </div>
      </div>
      <p className="mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
        incidunt!
      </p>
    </>
  );
};

export default UserBio;
