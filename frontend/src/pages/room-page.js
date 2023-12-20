import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import UsersTable from "../components/roomUsers";
import ActionButton from "../components/buttons/action-button";
import RedirectButton from "../components/buttons/redirect-button";

export default function RoomPage() {
    const { id } = useParams();
    const peerConnection = useRef(new RTCPeerConnection());
    const socket = useRef()
    const [users, setUsers] = useState([])

    useEffect(() => {
      socket.current = io('http://localhost:3000');
      socket.current.emit('join-room', id);
      
    const initWebRTC = async () => {
      peerConnection.current.addEventListener('icecandidate', handleICECandidateEvent);
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      
      socket.current.emit('offer', offer, socket.id);

      socket.current.on('offer', async (offer, senderSocketId) => {
        await peerConnection.current.setRemoteDescription(offer);
    
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
    
        socket.current.emit('answer', answer, senderSocketId);
      });
    
      socket.current.on('answer', async (answer) => {
        await peerConnection.current.setRemoteDescription(answer);
      });
    
      socket.current.on('ice-candidate', async (candidate) => {
        await peerConnection.current.addIceCandidate(candidate);
      });
    };

    initWebRTC();

    fetch('http://localhost:3000/rooms/' + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((result) => {
      result.json().then((data) => {
        setUsers(data.room.users)
      })
    })
  }, []);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.current.emit('ice-candidate', event.candidate, id);
    }
  };

  const disconnectFromRoom = () => {
    socket.current.emit('leave-room')
  }

  return (
      <div className="room-container">
        <UsersTable users={users} />
        <div className="button-container">
          <ActionButton name={"Unmute"}/>
          <RedirectButton name={"Back"} redirectPath={"/rooms"} onClickModifier={disconnectFromRoom}/>
        </div>
      </div>
  )

}