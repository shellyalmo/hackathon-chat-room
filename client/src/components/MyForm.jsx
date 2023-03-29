import { useState} from 'react';


export function MyForm({ setRoom, setUser, onSubmit }) {
  const [connectBtn, setConnectBtn] = useState(true);

  return (
    <form onSubmit={onSubmit} className="flex m-t-2">
      <p className='text-center'>Chat rooms</p>
      <input
        placeholder="User name"
        onChange={(e) => {
          setUser(e.target.value);
        }}
        className="m-b"
      />

      <input
        className="m-b"
        placeholder="Room name"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />

      <button className="btn btn-block m-b" type="submit" disabled={!connectBtn} onClick={ ()=>{ setConnectBtn(prev=>!prev)} }>
        Connect
      </button>
    </form>
  );
}
