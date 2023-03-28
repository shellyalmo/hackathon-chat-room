import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm({ setReturnRoom }) {
  const [room, setRoom] = useState("room1");

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.emit("join", { room: room });

    socket.timeout(5000).emit("create-something", "value", () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Room number"
        onChange={(e) => {
          setRoom(e.target.value);
          setReturnRoom(e.target.value);
        }}
        value={room}
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
