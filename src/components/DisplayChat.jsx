import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context";
import Chat from "./Chat";
import LoadingChat from "./LoadingChat";
import moment from "moment";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:5000" });

const DisplayChat = ({
  chatting,
  setChatting,
  groups,
  notif,
  setNotif,
  messages,
  chats,
  setChats,
  users,
}) => {
  const { currentUser } = useContext(AuthContext);

  let lastDate = null;

  let lastOpen =
    groups &&
    groups
      .filter(
        ({ messageId, userId }) =>
          messageId === chatting && currentUser.id === userId
      )
      .map((group) => group);

  const currentPerson =
    groups &&
    groups
      .filter(({ messageId }) => messageId === chatting)
      .map(({ id }) => id);

  const currentMessage =
    messages &&
    messages.filter(({ id }) => id === chatting).map((message) => message);

  const [popup, setPopup] = useState(null);
  const [update, setUpdate] = useState(null);

  const handlePopup = (e) => {
    if (e === popup) {
      setPopup(null);
    } else setPopup(e);
  };

  const [loadingChat, setLoadingChat] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoadingChat(!loadingChat);
    }, 2000);
  }, [chatting]);

  const newDate = new Date();
  const [data, setData] = useState({
    date: moment(newDate).format("MM/DD/YYYY HH:mm"),
    text: "",
    userId: currentUser.id,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onPost = async (e) => {
    let newData = {
      date: e.date,
      text: e.text,
      userId: e.userId,
      messageId: chatting,
    };

    api
      .post("/chats", newData)
      .then(setData((prev) => ({ ...prev, text: "" })));
  };

  const onUpdate = async (e) => {
    let newData = {
      date: e.date,
      text: e.text,
      userId: e.userId,
      messageId: chatting,
    };

    api
      .put(`/chats/${update}`, newData)
      .then(setData((prev) => ({ ...prev, text: "" })));
  };

  return (
    <div className={` w-full ${chatting == null && "hidden"} h-full relative `}>
      <div
        className={`flex border-b-[1px] border-[#828282] items-center w-full justify-between py-3 px-[34px] `}
      >
        <div className=" flex items-center gap-5 w-full ">
          <AiOutlineArrowLeft
            className=" cursor-pointer hover:opacity-50 "
            onClick={function (event) {
              setChatting(null);
            }}
          />
          <div className=" w-full ">
            <p className=" font-medium text-[#2F80ED] limit-text max-w-[90%] ">
              {chatting > 0 && currentMessage[0].title}
            </p>
            {chatting > 0 && currentPerson.length > 2 && (
              <p className=" text-xs text-[#333333] ">
                {currentPerson.length} Participants
              </p>
            )}
          </div>
        </div>

        <AiOutlineClose
          className=" cursor-pointer hover:opacity-50 "
          onClick={function (event) {
            setChatting(null);
          }}
        />
      </div>
      <div
        className={` absolute top-1/2 z-[5] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2F80ED] bg-[#E9F3FF] flex justify-center cursor-pointer items-center h-9 font-medium w-32 ${
          notif === chatting ? "block" : "hidden"
        } ${!loadingChat ? " block " : " hidden "} `}
        onClick={function () {
          setNotif(null);
        }}
      >
        New Message
      </div>
      <div
        className={` absolute bottom-[50px] flex gap-5 py-5 px-[34px] w-full ${
          loadingChat ? " flex " : " hidden "
        } `}
      >
        <LoadingChat />
      </div>

      <Chat
        chats={chats}
        setChats={setChats}
        users={users}
        lastDate={lastDate}
        lastOpen={lastOpen}
        notif={notif}
        chatting={chatting}
        handlePopup={handlePopup}
        popup={popup}
        loadingChat={loadingChat}
        setUpdate={setUpdate}
        setData={setData}
      />

      <div className=" absolute bottom-0 flex gap-5 py-5 px-[34px] w-full ">
        <input
          type="text"
          name="text"
          placeholder="Type a new message"
          className=" placeholder:text-[#4f4f4f4f]  border-[1px] border-[#828282] py-1 px-4 w-[90%] rounded-lg focus:outline-none "
          value={data.text}
          onChange={handleChange}
        />
        {update !== null ? (
          <button
            className=" bg-[#2F80ED] py-1 px-4 font-medium text-white rounded-lg "
            onClick={() => onUpdate(data)}
          >
            Update
          </button>
        ) : (
          <button
            className=" bg-[#2F80ED] py-1 px-4 font-medium text-white rounded-lg "
            onClick={() => onPost(data)}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayChat;
