import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { MyForm } from "./components/MyForm";
import { FormMsg } from "./components/FormMsg";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomEvent, setRoomEvent] = useState("");
  const [returnRoom, setReturnRoom] = useState("room1");
  const [oldData, setOldData] = useState([])
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("get old messages");
    }

    // listen for "old messages" event from the server
    socket.on("old messages", (chatMessages) => {
      // do something with the chatMessages array
      console.log(chatMessages);
      setOldData(chatMessages);
    });

    function onDisconnect() {
      setIsConnected(false);
    }


    function msgFromRoom(value) {
      setRoomEvent(value);
      // console.log("value",value);
      // setOldData([...oldData, value])
      socket.emit("get old messages");

    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on('fromServer', fromServer);
    socket.on("chat message", msgFromRoom);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.on('fromServer', fromServer);
      socket.off("chat message", msgFromRoom);
    };
  }, []);

  return (
    <div className="App">
      {oldData && <div>
        {oldData.map((data) => {
          return <p key={data._id}>{data.text}</p>
        })
        }
      </div>}
      <p key={"test"}>{roomEvent}</p>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <MyForm setReturnRoom={setReturnRoom} />
      <FormMsg room={returnRoom} />
    </div>
  );
}
