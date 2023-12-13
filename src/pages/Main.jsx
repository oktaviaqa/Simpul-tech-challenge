import React, { useState } from "react";
import Button from "../components/Button";
import Messages from "./Messages";
import { BiSearchAlt2 } from "react-icons/bi";
import Tasks from "./Tasks";

const Main = () => {
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);

  return (
    <div className=" w-full h-full ">
      <div className=" bg-[#4F4F4F] p-4 text-[#F2F2F2] text-lg ">
        <BiSearchAlt2 />
      </div>
      <Button
        menu1={menu1}
        menu2={menu2}
        menu3={menu3}
        setMenu1={setMenu1}
        setMenu2={setMenu2}
        setMenu3={setMenu3}
      />
      {menu2 && <Messages menu2={menu2} />}
      {menu3 && <Tasks menu3={menu3} />}
    </div>
  );
};

export default Main;
