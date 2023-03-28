import { NavLink } from 'react-router-dom'
import './ChatRoomBox.css'


export default function ChatRoomBox(props){



    return <div id="box-container">
        <h4>{props.topic}</h4>
        <NavLink to={'/chat'} >Open ChatRoom</NavLink>


    </div>
}