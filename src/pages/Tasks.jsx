import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import NewTask from "../components/NewTask";
import axios from "axios";
import DisplayTask from "../components/DisplayTask";

let api = axios.create({ baseURL: "http://localhost:5000" });

const Tasks = ({ menu3 }) => {
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState();
  const [task, setTask] = useState();
  const [taskOptions, setTaskOptions] = useState();
  const [options, setOptions] = useState(1);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tasks").then((res) => {
      setTasks(res.data);
      setTask(res.data);
    });
    api.get("/taskOptions").then((res) => {
      setTaskOptions(res.data);
    });
  }, [task]);

  useEffect(() => {
    let newState =
      task && task.filter(({ option }) => option === options).map((e) => e);
    setTasks(newState);
    setTimeout(() => {
      setLoading(!loading);
    }, 3000);
  }, [options]);

  const onAdd = async (title, date, description, complete, option) => {
    let toSave = {
      title: title,
      date: date,
      description: description,
      complete: complete,
      option: option,
    };

    // menambahkan data
    api.post("/tasks", toSave).then(() => setNewTask(!newTask));
  };

  const onUpdate = async (data, checkbox) => {
    const putData = {
      title: data.title,
      date: data.date,
      description: data.description,
      option: data.option,
      complete: checkbox,
    };
    api.put(`/tasks/${data.id}`, putData).then((res) => res);
    api.get("/tasks").then((res) => {
      setTasks(res.data);
      setTask(res.data);
    });
  };

  const onDelete = async (task_id) => {
    api.delete(`/tasks/${task_id}`).then((res) => res);
    let newState =
      task && task.filter(({ id }) => id === task_id).map((e) => e);
    setTasks(newState);
    setTask(newState);
  };

  return (
    <div
      className={`absolute bottom-28 right-8 bg-white rounded-md w-2/6 h-[70%] py-5 px-[34px] flex-col gap-5 ${
        menu3 ? "flex " : "hidden"
      } `}
    >
      <div className={` w-full relative `}>
        <div className="flex items-center justify-between text-sm ">
          <div
            className=" py-2 px-3 rounded-md border-[1px] border-[#828282] flex items-center gap-2 font-medium text-[#4F4F4F] "
            onClick={() => setHide(!hide)}
          >
            {taskOptions &&
              taskOptions
                .filter(({ id }) => id === options)
                .map((data) => <p key={data.id}>{data.name}</p>)}
            {!hide ? <IoChevronDown /> : <IoChevronUp />}
          </div>
          <div
            className={` absolute bg-white z-10 border-[1px] border-[#828282] rounded-md w-[40%] top-12 ${
              !hide && "hidden"
            } `}
          >
            {taskOptions &&
              taskOptions
                .filter(({ id }) => id !== options)
                .map((data) => (
                  <p
                    key={data.id}
                    className=" py-2 px-3 border-b-[1px] border-[#828282] last:border-none font-medium text-[#4F4F4F] hover:text-[#d6d6d6] cursor-pointer "
                    onClick={() => setOptions(data.id)}
                  >
                    {data.name}
                  </p>
                ))}
          </div>

          <button
            className=" bg-[#2F80ED] py-2 px-3 rounded-md text-white font-medium hover:opacity-50 "
            onClick={() => setNewTask(!newTask)}
          >
            New Task
          </button>
        </div>
      </div>
      <div
        className={` h-[88%]  w-full justify-center items-center overflow-y-scroll scrollbar-custom pr-[calc(34px-12px)] ${
          loading && "hidden"
        }  `}
      >
        {tasks &&
          tasks.map((data, index) => (
            <DisplayTask
              data={data}
              key={index}
              index={index}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        <div className={`${!newTask && "hidden"}`}>
          <NewTask
            onAdd={onAdd}
            newTask={newTask}
            setNewTask={setNewTask}
            options={options}
          />
        </div>
      </div>
      <div
        className={` h-full w-full justify-center items-center ${
          loading ? " flex " : " hidden "
        } `}
      >
        <Loading text="Loading Task List ..." />
      </div>
    </div>
  );
};

export default Tasks;
