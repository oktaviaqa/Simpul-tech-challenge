import React, { useContext, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { AuthContext } from "../context";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:5000" });

const Chat = ({
  chats,
  setChats,
  users,
  lastDate,
  lastOpen,
  notif,
  chatting,
  popup,
  handlePopup,
  loadingChat,
  setUpdate,
  setData,
}) => {
  const { currentUser } = useContext(AuthContext);

  const onDelete = async (id) => {
    api.delete(`/chats/${id}`);
  };

  useEffect(() => {
    api.get("/chats").then((res) => {
      setChats(res.data);
    });
  }, [chats]);

  return (
    <div
      className={` flex flex-col gap-5 py-3 pl-[34px] pr-[calc(34px-12px)] h-[72%] overflow-y-scroll scrollbar-custom mr-3 relative ${
        notif === chatting && "opacity-60"
      } ${!loadingChat ? " flex " : " hidden "}`}
    >
      {chats &&
        chats
          .filter(({ messageId }) => messageId === chatting)
          .map((chat) => (
            <div
              className={` flex flex-col w-full gap-2  ${
                currentUser.id === chat.userId && "items-end"
              }`}
              key={chat.id}
            >
              {lastDate !== null && (
                <div
                  className={` relative flex w-full justify-center items-center my-5 ${
                    moment(chat.date).format("D MMM YYYY") ===
                      moment(lastDate).format("D MMM YYYY") && "hidden"
                  } `}
                >
                  <div
                    className={` w-full h-[1px] ${
                      moment(chat.date).format("D MMM YYYY HH:mm:ss") >
                      moment(lastOpen[0].date).format("D MMM YYYY HH:mm:ss")
                        ? "bg-[#EB5757]"
                        : "bg-[#4F4F4F]"
                    } `}
                  ></div>
                  <p
                    className={` absolute px-4 bg-white  font-medium ${
                      moment(chat.date).format("D MMM YYYY HH:mm:ss") >
                      moment(lastOpen[0].date).format("D MMM YYYY HH:mm:ss")
                        ? "text-[#EB5757]"
                        : "text-[#4F4F4F]"
                    } `}
                  >
                    {moment(chat.date).format("D MMM YYYY HH:mm:ss") >
                    moment(lastOpen[0].date).format("D MMM YYYY HH:mm:ss")
                      ? "New Messages"
                      : moment(chat.date).format("D MMM YYYY")}
                  </p>
                </div>
              )}
              <p className="hidden">{(lastDate = chat.date)}</p>
              <p
                className={` font-medium  ${
                  currentUser.id === chat.userId
                    ? "text-[#9B51E0] "
                    : chat.userId % 2 === 0
                    ? "text-[#E6A443]"
                    : "text-[#43B78D] "
                } `}
              >
                {currentUser.id === chat.userId
                  ? "You"
                  : users &&
                    users
                      .filter(({ id }) => id === chat.userId)
                      .map(({ name }) => name)}
              </p>
              <div
                className={` flex gap-3 min-w-[175px] max-w-[350px] relative  ${
                  currentUser.id === chat.userId && "flex-row-reverse"
                } `}
              >
                <div
                  className={` w-full  p-2 rounded-md flex flex-col gap-1 ${
                    currentUser.id === chat.userId
                      ? "bg-[#EEDCFF]"
                      : chat.userId % 2 === 0
                      ? "bg-[#FCEED3]"
                      : " bg-[#D2F2EA] "
                  }  `}
                >
                  <p className=" text-[#4F4F4F] ">{chat.text}</p>
                  <p className=" text-xs text-[#4F4F4F] font-med ">
                    {moment(chat.date).format("HH:mm")}
                  </p>
                </div>
                <BsThreeDots
                  onClick={() => handlePopup(chat.id)}
                  className="cursor-pointer"
                />
                {popup === chat.id && currentUser.id === chat.userId && (
                  <div
                    className={` border-[1px] border-[#BDBDBD] rounded-md absolute bg-white ${
                      currentUser.id === chat.userId ? "left-0" : "right-0"
                    }  top-5 z-20 `}
                  >
                    <p
                      className=" py-2 px-4 border-b-[1px] border-[#BDBDBD] text-[#2F80ED] cursor-pointer hover:opacity-50 "
                      onClick={function () {
                        setUpdate(chat.id);
                        setData((prev) => ({ ...prev, text: chat.text }));
                        handlePopup(chat.id);
                      }}
                    >
                      Edit
                    </p>
                    <p
                      className=" py-2 px-4  text-[#EB5757] cursor-pointer hover:opacity-50 "
                      onClick={() => onDelete(chat.id)}
                    >
                      Delete
                    </p>
                  </div>
                )}
                {popup === chat.id && currentUser.id !== chat.userId && (
                  <div
                    className={` border-[1px] border-[#BDBDBD] rounded-md absolute bg-white ${
                      currentUser.id === chat.userId ? "left-0" : "right-0"
                    }  top-5 z-20 `}
                  >
                    <p className=" py-2 px-4 border-b-[1px] border-[#BDBDBD] text-[#2F80ED] cursor-pointer hover:opacity-50 ">
                      Share
                    </p>
                    <p className=" py-2 px-4  text-[#2F80ED] cursor-pointer hover:opacity-50 ">
                      Reply
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chat;
