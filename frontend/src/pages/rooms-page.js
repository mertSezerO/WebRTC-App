import { useEffect, useState } from 'react';
import Room from '../components/room';

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/rooms", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((data) => {
           data.json()
           .then(({rooms}) => {
                setRooms(rooms)
           })
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className='item-container'>
            {Array.isArray(rooms) &&
                rooms.map((room) => (
                    <Room room={room} key={room.id}/>
                ))
            }
        </div>
    )
}