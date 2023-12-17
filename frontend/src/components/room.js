import { useNavigate } from 'react-router-dom';

export default function Room({ room }) {
    const navigate = useNavigate()

    function onClick() {
        const navigateTo = "" + room.id
        navigate(navigateTo)
    }

    return (
        <div className="item" onClick={onClick}>
            <h2>{room.name}</h2>
            <h3>Capacity: {room.capacity}</h3>
            <h3>{room.privacyType}</h3>
        </div>
    )
}