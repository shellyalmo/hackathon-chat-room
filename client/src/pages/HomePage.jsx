import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoomBox from "../components/ChatRoomComp";
import './HomePage.css'
export default function HomePage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(undefined);
  useEffect(() => {
    // setRooms(getRooms());
    const r=getRooms();
  }, []);

  useEffect(() => {
   
      console.log("rooms", rooms);
   
  }, [rooms]);

  async function getRooms() {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    await fetch(`http://localhost:5000/api/chats/chatrooms/`)
      .then((res) => res.json())
      .then((res) => {
          console.log("res", res);
        setRooms(res);
      });
  }

  return (
    <div id="home-container">
      <h1>Chat Rooms</h1>
      
      <div id="rooms-container">
        {Array.isArray(rooms) &&
          rooms.map((c) => {
            console.log(c);
            return (
              <ChatRoomBox topic={c.topic}/>
            );
          })}
      </div>
    </div>
  );
}
