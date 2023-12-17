import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/landing-page';
import RoomsPage from './pages/rooms-page';
import CreateRoomPage from './pages/create-room-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />}/>
        <Route path='/rooms' element={<RoomsPage />}></Route>
        <Route path='/create' element={<CreateRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
