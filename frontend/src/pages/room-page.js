import { useParams } from "react-router-dom";
import io from 'socket.io-client';

export default function RoomPage() {
    const { id } = useParams();
    const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    socket.current = io('http://localhost:3000');

    const initWebRTC = async () => {
      peerConnection.current.addEventListener('icecandidate', handleICECandidateEvent);
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.current.emit('offer', offer, socket.id);
    };

    initWebRTC();
  }, []);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.current.emit('ice-candidate', event.candidate, id);
    }
  };

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

}