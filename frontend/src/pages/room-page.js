import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import UsersTable from "../components/roomUsers";
import ActionButton from "../components/buttons/action-button";
import RedirectButton from "../components/buttons/redirect-button";

export default function RoomPage() {
    const { id } = useParams();
    const peerConnection = useRef(new RTCPeerConnection());
    const socket = useRef()
    let room;

  useEffect(() => {
    socket.current = io('http://localhost:3000');

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
        room = data.room;
      })
    })

    // socket.current.emit('join-room', id);
  }, []);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.current.emit('ice-candidate', event.candidate, id);
    }
  };


  return (
      <div className="room-container">
        { room && <UsersTable users={room.getUsers()} />}
        <div className="button-container">
          <ActionButton name={"Unmute"}/>
          <RedirectButton name={"Back"} redirectPath={"/rooms"}/>
        </div>
      </div>
  )

}