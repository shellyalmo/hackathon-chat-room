import React, { useState } from "react";
import { socket } from "../socket";

export function FormMsg({room}) {
  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.emit(room, {  msg: msg });
    setIsLoading(false);

  }

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Send message"
        onChange={(e) => setMsg(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}