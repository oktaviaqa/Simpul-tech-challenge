import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context";
import DisplayMessage from "../components/DisplayMessage";
import DisplayChat from "../components/DisplayChat";
import axios from "axios";
import moment from "moment";

let api = axios.create({ baseURL: "http://localhost:5000" });

const Messages = ({ menu2 }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, "pppppppppppppp");
  const [messages, setMessages] = useState();
  const [users, setUsers] = useState();
  const [groups, setGroups] = useState();
  const [chats, setChats] = useState();

  useEffect(() => {
    api.get("/messages").then((res) => {
      setMessages(res.data);
    });
    api.get("/users").then((res) => {
      setUsers(res.data);
    });
    api.get("/groups").then((res) => {
      setGroups(res.data);
    });
    api.get("/chats").then((res) => {
      setChats(res.data);
    });
  }, [messages]);

  const [chatting, setChatting] = useState(null);
  const [notif, setNotif] = useState(null);

  const messageId =
    groups &&
    groups
      .filter(({ userId }) => userId === currentUser.id)
      .map(({ messageId }) => messageId);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 3000);
  }, [chatting]);

  const updateTime = async (message_id) => {
    const idGroup = groups.filter(
      ({ messageId, userId }) =>
        messageId === message_id && userId === currentUser.id
    );

    const newDate = new Date();
    const updateData = {
      userId: idGroup[0].userId,
      messageId: idGroup[0].messageId,
      date: moment(newDate).format("MM/DD/YYYY HH:mm"),
    };

    api.put(`/groups/${idGroup[0].id}`, updateData).then((res) => res);
    api.get("/groups").then((res) => {
      setGroups(res.data);
    });
  };

  return (
    <div
      className={`absolute bottom-28 right-8 bg-white rounded-md w-2/6 h-[70%]  flex-col ${
        menu2 ? "flex" : "hidden"
      } `}
    >
      <DisplayMessage
        messages={messages}
        messageId={messageId}
        groups={groups}
        chats={chats}
        users={users}
        loading={loading}
        chatting={chatting}
        setChatting={setChatting}
        setNotif={setNotif}
        updateTime={updateTime}
      />
      <DisplayChat
        chatting={chatting}
        setChatting={setChatting}
        groups={groups}
        notif={notif}
        setNotif={setNotif}
        messages={messages}
        chats={chats}
        setChats={setChats}
        users={users}
      />
    </div>
  );
};

export default Messages;
