import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { BiBookmarks } from "react-icons/bi";
import moment from "moment";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:5000" });

const DisplayTask = ({ data, index, onUpdate, onDelete }) => {
  let currentDate = new Date();
  const dateOne = new Date(currentDate);
  const dateTwo = new Date(data.date);
  const different = dateTwo - dateOne;
  const days = Math.ceil(different / (1000 * 60 * 60 * 24));

  const [checkbox, setCheckbox] = useState(false);
  const [option, setOption] = useState(true);
  const [simple, setSimple] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [tag, setTag] = useState(null);
  const [taskTag, setTaskTag] = useState(null);

  useEffect(() => {
    if (days < 0 || data.complete === true) setCheckbox(!checkbox);
    api.get("/tagline").then((res) => {
      setTag(res.data);
    });
  }, []);

  const addTask = async (tagline_id) => {
    let toSave = {
      taskId: data.id,
      taglineId: tagline_id,
    };
    api.post("/taskTag", toSave);
  };

  const deleteTask = async (tasktag_id) => {
    api.delete(`/taskTag/${tasktag_id}`);
  };

  useEffect(() => {
    api.get("/taskTag").then((res) => {
      setTaskTag(res.data);
    });
  }, [taskTag]);

  const dataTaskTag =
    taskTag &&
    taskTag.filter(({ taskId }) => taskId === data.id).map((res) => res);

  return (
    <div
      className={` flex items-start gap-3 w-full relative pb-4 border-b-[1px] border-[#828282] first:pt-0 pt-4 `}
    >
      <button
        className=" w-[17px] h-[17px] border-[2px] border-[#828282] flex justify-center items-center text-xs rounded-sm "
        onClick={function () {
          onUpdate(data, !checkbox);
          setCheckbox(!checkbox);
        }}
      >
        <AiOutlineCheck className={!checkbox && "hidden"} />
      </button>
      <div className=" flex flex-col gap-2 w-full ">
        <div className=" w-full flex justify-between items-start">
          <p
            className={` text-sm font-medium w-[60%] ${
              checkbox && " line-through text-[#828282] "
            } `}
          >
            {data.title}
          </p>
          <div className="text-xs flex items-center gap-2 text-[#4F4F4F] ">
            <p className={`text-[#EB5757] ${checkbox && "hidden"} `}>
              {days} Days left
            </p>
            <p>{moment(data.date).format("DD/MM/yyyy")}</p>
            <p
              onClick={() => setSimple(!simple)}
              className=" cursor-pointer hover:opacity-50 "
            >
              {!simple ? <IoChevronUp /> : <IoChevronDown />}
            </p>
            <BsThreeDots
              onClick={() => setOption(!option)}
              className="cursor-pointer hover:opacity-50"
            />
          </div>
        </div>
        <div
          className={` border-[1px] border-[#828282] absolute right-0 pl-2 pr-6 py-1 rounded-md text-sm text-[#EB5757] cursor-pointer hover:opacity-50 bg-white ${
            !option && "hidden"
          } ${index === 0 ? "top-6" : "top-9"} `}
          onClick={() => onDelete(data.id)}
        >
          Delete
        </div>
        <div
          className={` flex items-center justify-start gap-3 ${
            simple && "hidden"
          } `}
        >
          <AiOutlineClockCircle
            className={`${
              data.date ? "text-[#2F80ED]" : "text-[#828282]"
            }  text-xl w-5 h-5  `}
          />
          <div className=" flex items-center  py-1 px-2 gap-5 border-[1px] border-[#828282] rounded-md text-[#4F4F4F] ">
            <p className=" text-sm ">
              {data.date
                ? moment(data.date).format("DD/MM/yyyy")
                : "dd/mm/yyyy"}
            </p>
            <AiOutlineCalendar className=" w-full h-full " />
          </div>
        </div>
        <div
          className={` flex items-start justify-start gap-3 w-full ${
            simple && "hidden"
          } `}
        >
          <MdOutlineModeEdit
            className={`${
              data.description === "No Description"
                ? "text-[#828282]"
                : "text-[#2F80ED]"
            }  w-5 h-5  `}
          />
          <p className=" w-full resize-none focus:outline-none text-sm text-justify ">
            {data.description}
          </p>
        </div>
        <div
          className={` flex items-start justify-start gap-3 w-full py-2 rounded-md relative bg-[#F9F9F9] ${
            simple && "hidden"
          } `}
        >
          <BiBookmarks
            className={`${
              dataTaskTag && dataTaskTag.length > 0
                ? "text-[#2F80ED]"
                : "text-[#828282]"
            }  w-5 h-5  `}
            onClick={() => setOpenTag(!openTag)}
          />
          <div
            className={`${
              !openTag && "hidden"
            } flex flex-col w-[50%] absolute top-8 py-2 px-2 z-10 gap-2 bg-white rounded-lg border-[1px] border-[#828282] `}
          >
            {tag &&
              tag.map((data) => (
                <button
                  key={data.id}
                  className={` text-xs text-left py-[6px] px-3 text-[#4F4F4F] rounded-md font-medium hover:opacity-50 ${
                    data.id === 1
                      ? "bg-[#E5F1FF]"
                      : data.id === 2
                      ? "bg-[#FDCFA4]"
                      : data.id === 3
                      ? "bg-[#F9E9C3]"
                      : data.id === 4
                      ? "bg-[#AFEBDB]"
                      : data.id === 5
                      ? "bg-[#CBF1C2]"
                      : data.id === 6
                      ? "bg-[#CFCEF9]"
                      : data.id === 7
                      ? "bg-[#F9E0FD]"
                      : "bg-[#9DD0ED]"
                  } `}
                  onClick={() => addTask(data.id)}
                >
                  {data.name}
                </button>
              ))}
          </div>
          <div className=" w-full resize-none focus:outline-none text-sm flex gap-2 flex-wrap ">
            {taskTag &&
              taskTag
                .filter(({ taskId }) => taskId === data.id)
                .map((res) => (
                  <button
                    key={res.id}
                    className={` text-xs text-left py-[6px] px-3 text-[#4F4F4F] rounded-md font-medium hover:opacity-50 ${
                      res.taglineId === 1
                        ? "bg-[#E5F1FF]"
                        : res.taglineId === 2
                        ? "bg-[#FDCFA4]"
                        : res.taglineId === 3
                        ? "bg-[#F9E9C3]"
                        : res.taglineId === 4
                        ? "bg-[#AFEBDB]"
                        : res.taglineId === 5
                        ? "bg-[#CBF1C2]"
                        : res.taglineId === 6
                        ? "bg-[#CFCEF9]"
                        : res.taglineId === 7
                        ? "bg-[#F9E0FD]"
                        : "bg-[#9DD0ED]"
                    } `}
                    onClick={() => deleteTask(res.id)}
                  >
                    {tag &&
                      tag
                        .filter(({ id }) => id === res.taglineId)
                        .map((data) => data.name)}
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTask;
