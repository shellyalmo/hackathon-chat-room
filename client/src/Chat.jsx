import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { FormMsg } from './components/FormMsg';



export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [roomEvent, setRoomEvent] = useState("");
  const [returnRoom, setReturnRoom] = useState("");


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }


    function msgFromRoom(value){
      setRoomEvent(value);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('fromServer', fromServer);
    socket.on('chat message', msgFromRoom);



    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.on('fromServer', fromServer);
      socket.off('chat message', msgFromRoom);


    };
  }, []);

  return (
    <div className="App">
      <p key={"test"}>{roomEvent}</p>
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <MyForm setReturnRoom={setReturnRoom}/>
      <FormMsg room={returnRoom}/>
    </div>
  );
}