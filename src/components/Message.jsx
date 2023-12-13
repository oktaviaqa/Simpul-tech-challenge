import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { MdPersonOutline } from "react-icons/md";
import moment from "moment";

const Message = ({ message, groups, chats, users, setNewMessage }) => {
  const { currentUser } = useContext(AuthContext);

  const group =
    groups &&
    groups
      .filter(({ messageId }) => messageId === message.id)
      .map((group) => group);

  const lastUser =
    chats &&
    chats
      .filter(({ messageId }) => messageId === message.id)
      .slice(-1)
      .map((chat) => chat);

  const lastOpen =
    group &&
    group.filter(({ userId }) => userId === currentUser.id).map((data) => data);

  useEffect(() => {
    if (
      moment(lastOpen[0].date).format("D MMM YYYY HH:mm:ss") <
      moment(lastUser[0].date).format("D MMM YYYY HH:mm:ss")
    )
      setNewMessage(message.id);
  }, [lastUser[0].date]);

  return (
    <div className=" w-full flex items-center gap-5 relative ">
      <div
        className={` flex items-center relative w-[14%] ${
          group.length === 2 && "justify-center"
        } `}
      >
        <div
          className={` w-10 h-10 flex justify-center items-center ${
            group.length > 2
              ? "bg-[#E0E0E0] text-[#4F4F4F]"
              : "bg-[#2F80ED] text-white"
          }  rounded-full `}
        >
          <MdPersonOutline
            className={`${group.length > 2 ? "block" : "hidden"} `}
          />
          <p
            className={`${group.length === 2 ? "block" : "hidden"} font-bold `}
          >
            {message.title[0]}
          </p>
        </div>
        <div
          className={` absolute left-5 bg-[#2F80ED] text-white rounded-full w-10 h-10 flex justify-center items-center ${
            group.length === 2 && "hidden"
          } `}
        >
          <MdPersonOutline />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-[2px] ">
        <div className=" w-full gap-3 flex">
          <p className=" text-sm text-[#2F80ED] font-medium max-w-[75%] ">
            {message.title}
          </p>
          <p className="text-xs text-[#4F4F4F]">
            {lastUser.length === 1 &&
              moment(lastUser[0].date).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
        {group.length > 2 &&
          users &&
          users
            .filter(({ id }) => id === lastUser[0].userId)
            .map((user) => (
              <p className=" text-xs font-bold " key={user.id}>
                {user.name}
              </p>
            ))}

        <p className="text-xs text-[#4F4F4F] max-w-[75%] limit-text ">
          {lastUser.length === 1 && lastUser[0].text}
        </p>
      </div>
      {moment(lastOpen[0].date).format("D MMM YYYY HH:mm:ss") <
        moment(lastUser[0].date).format("D MMM YYYY HH:mm:ss") && (
        <div
          className={` absolute w-2 h-2 bg-[#EB5757] rounded-full right-0 `}
        ></div>
      )}
    </div>
  );
};

export default Message;
