import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { BiSearchAlt2 } from "react-icons/bi";
import Message from "./Message";

const DisplayMessage = ({
  messages,
  messageId,
  groups,
  chats,
  users,
  loading,
  chatting,
  setChatting,
  setNotif,
  updateTime,
  wasOpen,
}) => {
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    // Menciptakan dependency array yang sesuai
    setNotif((prevNotif) => {
      // Pastikan Anda mengonfirmasikan bahwa Anda hanya memperbarui notifikasi ketika diperlukan
      if (newMessage && newMessage !== prevNotif) {
        return newMessage;
      }
      return prevNotif;
    });
  }, [newMessage, setNotif]);

  return (
    <div
      className={` px-[34px] py-5 w-full h-full flex flex-col gap-[17px] ${
        chatting > 0 && "hidden"
      }`}
    >
      <div
        className={`flex border-[1px] border-[#828282] rounded-lg items-center  py-2 px-7 justify-between  `}
      >
        <input
          type="text"
          name="search"
          className=" bg-transparent placeholder:text-black focus:outline-none w-11/12 text-sm "
          placeholder="Search"
        />
        <BiSearchAlt2 />
      </div>

      <div
        className={` w-full h-[90%] flex flex-col justify-start overflow-y-scroll scrollbar-custom ${
          !loading ? " flex " : " hidden "
        } `}
      >
        {messages &&
          messages
            .filter(({ id }) => messageId && messageId.includes(id))
            .map((message, index) => (
              <div
                key={message.id}
                onClick={function () {
                  setChatting(message.id);
                  updateTime(message.id);
                }}
                className="cursor-pointer hover:opacity-50  first:py-0 first:pb-[17px] py-[17px] last:border-0 border-b-[1px] border-[#828282] "
              >
                <Message
                  message={message}
                  groups={groups}
                  chats={chats}
                  users={users}
                  setNewMessage={setNewMessage}
                />
              </div>
            ))}
      </div>
      <div
        className={` w-full h-full  flex justify-center items-center ${
          loading ? " flex " : " hidden "
        } `}
      >
        <Loading text="Loading Chats ..." />
      </div>
    </div>
  );
};

export default DisplayMessage;
