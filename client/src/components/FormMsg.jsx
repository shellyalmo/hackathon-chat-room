import React, { useState } from "react";
import { socket } from "../socket";

export function FormMsg({room, user}) {
  const [msg, setMsg] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.emit(room, {  msg: msg, user:user });
    setIsLoading(false);

  }

  return (
    <form onSubmit={onSubmit} className="flex">
      <input
      className="m-b"
        placeholder="Send message"
        onChange={(e) => setMsg(e.target.value)}
      />

      <button type="submit" disabled={isLoading} className="btn btn-block m-b"
>
        Send
      </button>
    </form>
  );
}
