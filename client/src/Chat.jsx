import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { MyForm } from "./components/MyForm";
import { FormMsg } from "./components/FormMsg";
import Rows from "./components/Rows";

import "./components/css/Chat.css";
import useTranslation from "./hooks/translate";
export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomEvent, setRoomEvent] = useState([]);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");

  const [oldData, setOldData] = useState([]);

  const { loading, handleTranslate, output: translatedText } = useTranslation();
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      // socket.emit("get old messages");
    }

    // listen for "old messages" event from the server
    // socket.on("old messages", (chatMessages) => {
    //   // do something with the chatMessages array
    //   console.log(chatMessages);
    //   setOldData(chatMessages);
    // });

    function onDisconnect() {
      setIsConnected(false);
    }

    function msgFromRoom(value) {
      setRoomEvent(value);
      // console.log("value",value);
      // setOldData([...oldData, value])
      // socket.emit("get old messages");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", msgFromRoom);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", msgFromRoom);
    };
  }, []);
  function onSubmit(event) {
    event.preventDefault();
    socket.emit("join", { room: room });
    socket.timeout(5000).emit("create-something", "error", () => {});
  }

  <button onClick={() => translateText(data.text)}>Translate</button>;

  async function translateText(text) {
    console.log(text);
    const res = await handleTranslate(text, "en", language);
    console.log(res);
    const index = oldData.findIndex((item) => item.text === text);
    console.log(res, index);
    const temp = [...oldData]; // create a new copy of the oldData array
    temp[index].text = res;
    setOldData(temp);
  }

  return (
    <div className="chat-app">
      <button
        disabled={language === "HE"}
        onClick={() => {
          setLanguage("HE");
        }}
      >
        HE
      </button>
      <button
        disabled={language === "AR"}
        onClick={() => {
          setLanguage("AR");
        }}
      >
        AR
      </button>
      <div className="chat-app-header">Topic Name</div>
      <div className="chat-app-messages">
        {oldData &&
          oldData.map((data, index) => (
            <div className="message-container" key={index}>
              <h4 className="sender-name">Sender Name</h4>
              <p className="message">{data.text}</p>
              <button onClick={() => translateText(data.text)}>
                Translate
              </button>

              {translatedText && <p>{translatedText}</p>}
              {loading && <p>loading....</p>}
            </div>
          ))}
      </div>
      {/* <div className="chat-app-footer"> */}


        {/* <p>{roomEvent}</p>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
        <MyForm setReturnRoom={setReturnRoom} />
        <FormMsg room={returnRoom} /> */}

        <div
          div
          className="card text-center flex grid-2 m-t "
          style={{ width: "80%", height: "28rem" }}
        >
          <Rows rows={roomEvent} />
          <div>
            <MyForm setRoom={setRoom} setUser={setUser} onSubmit={onSubmit} />
            <FormMsg room={room} user={user} />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
