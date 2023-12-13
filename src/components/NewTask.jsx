import React, { useState } from "react";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";

const NewTask = ({ onAdd, setNewTask, newTask, options }) => {
  let newDate = new Date();
  const [data, setData] = useState({
    title: "",
    date: "",
    description: "No Description",
    complete: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    if (
      e.target.name === "date" &&
      moment(e.target.value).format("DD/MM/yyyy") <
        moment(newDate).format("DD/MM/yyyy")
    ) {
      setData((prev) => ({ ...prev, complete: true }));
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [option, setOption] = useState(true);
  const [simple, setSimple] = useState(false);

  return (
    <div className=" flex items-start gap-3 w-full relative first:pb-0 pb-4 pt-4  ">
      <div className=" flex flex-col gap-2 w-full ">
        <div className=" w-full flex justify-between  ">
          <div className=" items-center gap-3 flex  w-full ">
            <button className=" w-[17px] h-[17px] border-[2px] border-[#828282] flex justify-center items-center text-xs rounded-sm "></button>
            <input
              type="text"
              name="title"
              className=" text-sm px-2 border-[1px] border-[#828282] py-1 text-[#4F4F4F] placeholder:text-[#4F4F4F] w-[60%] rounded-md "
              onChange={handleChange}
              placeholder="Type Task Title"
              value={data.title}
            />
          </div>
          <div className="text-xs flex items-center gap-2 relative  ">
            <p
              onClick={() => setSimple(!simple)}
              className=" cursor-pointer hover:opacity-50 "
            >
              {!simple ? <IoChevronUp /> : <IoChevronDown />}
            </p>
            <BsThreeDots
              className=" cursor-pointer hover:opacity-50 "
              onClick={() => setOption(!option)}
            />
            <div
              className={` border-[1px] border-[#828282] absolute right-0 rounded-md text-sm top-6 bg-white ${
                !option && "hidden"
              } `}
            >
              <p
                className="text-[#41c86e] cursor-pointer hover:opacity-50 w-full h-full pl-2 pr-6 py-1 "
                onClick={function () {
                  onAdd(
                    data.title,
                    data.date,
                    data.description,
                    data.complete,
                    options
                  );
                  setData({
                    title: "",
                    date: "",
                    description: "No Description",
                    complete: false,
                  });
                }}
              >
                Save
              </p>
              <hr className=" border-[0,5px] border-[#828282] " />
              <p
                className="text-[#EB5757] cursor-pointer hover:opacity-50 w-full h-full pl-2 pr-6 py-1  "
                onClick={function () {
                  setData({
                    title: "",
                    date: "",
                    description: "No Description",
                    complete: false,
                  });
                  setNewTask(!newTask);
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
        <div
          className={` flex items-center justify-start gap-3 ml-[29px] w-[calc(100% - 29px)] ${
            simple && "hidden"
          } `}
        >
          <AiOutlineClockCircle
            className={`${
              data.date ? "text-[#2F80ED]" : "text-[#828282]"
            }  text-xl w-5 h-5  `}
          />
          <div className=" flex items-center justify-between py-1 px-2 gap-5 border-[1px] border-[#828282] rounded-md ">
            <p className=" text-sm text-[#4F4F4F] ">
              {data.date ? moment(data.date).format("DD/MM/yyyy") : "Set Date"}
            </p>
            <div className="datepicker-toggle ">
              <span className="datepicker-toggle-button hover:opacity-50 text-[#4F4F4F] ">
                <AiOutlineCalendar className=" w-full h-full cursor-pointer " />
              </span>
              <input
                type="date"
                name="date"
                className="datepicker-input  "
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div
          className={` flex items-start justify-start gap-3 w-[calc(100% - 29px)] ml-[29px] ${
            simple && "hidden"
          } `}
        >
          <MdOutlineModeEdit
            className={`${
              !data.description ? "text-[#828282]" : "text-[#2F80ED]"
            }  w-5 h-5  `}
          />
          <TextareaAutosize
            className=" w-full resize-none focus:outline-none text-sm text-[#4F4F4F] py-1 px-2  border-[1px] border-[#828282] rounded-md "
            maxRows={3}
            name="description"
            onChange={handleChange}
            data={data}
            placeholder="Type Description"
            value={data.description}
          />
        </div>
      </div>
    </div>
  );
};

export default NewTask;
