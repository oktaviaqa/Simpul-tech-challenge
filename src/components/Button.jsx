import React from "react";
import {
  MdOutlineQuestionAnswer,
  MdOutlineChromeReaderMode,
} from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

const Button = ({ menu1, menu2, menu3, setMenu1, setMenu2, setMenu3 }) => {
  return (
    <div
      className={` absolute bottom-8 right-8 flex  ${
        menu3 ? "flex-row-reverse gap-5" : menu2 ? "gap-5" : "gap-2"
      } `}
    >
      <button
        className={
          menu1
            ? ` h-14 w-14 flex justify-center items-center ${
                menu3
                  ? "text-[#F2F2F2] bg-[#F8B76B]"
                  : "bg-[#F2F2F2] text-[#F8B76B]"
              }  text-xl rounded-full `
            : "hidden"
        }
        style={{
          boxShadow: `${menu3 ? "-10px 0 0 0 #4F4F4F" : "none"}`,
        }}
        onClick={function (event) {
          setMenu3(!menu3);
          setMenu2(false);
        }}
      >
        <MdOutlineChromeReaderMode />
      </button>
      <button
        className={
          menu1
            ? ` h-14 w-14 flex justify-center items-center ${
                menu2
                  ? "text-[#F2F2F2] bg-[#8885FF]"
                  : "bg-[#F2F2F2] text-[#8885FF]"
              }  text-xl rounded-full `
            : "hidden"
        }
        style={{
          boxShadow: `${menu2 ? "-10px 0 0 0 #4F4F4F" : "none"}`,
        }}
        onClick={function (event) {
          setMenu2(!menu2);
          setMenu3(false);
        }}
      >
        <MdOutlineQuestionAnswer />
      </button>
      <button
        className={
          (menu3 && "hidden") ||
          (menu2 && "hidden") ||
          " h-14 w-14 flex justify-center text-white items-center text-xl bg-[#2F80ED] rounded-full "
        }
        onClick={() => setMenu1(!menu1)}
      >
        <BsFillLightningChargeFill />
      </button>
    </div>
  );
};

export default Button;
