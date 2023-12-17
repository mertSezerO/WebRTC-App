import Input from "../components/input"
import RedirectButton from "../components/buttons/redirect-button"

export default function CreateRoomPage() {
    let name;
    let capacity;
    let privacyType;

    const createRoom = async () => {
        const response = await fetch("http://localhost:3000/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                capacity: capacity,
                privacyType: privacyType
            })
        })
        const { room } = await response.json();
        return room
    }

    function changeNameInput(e) {
        name = e.target.value;
    }

    function changeCapacityInput(e) {
        capacity = e.target.value;
    }

    function changePrivacyInput(e) {
        privacyType = e.target.value;
    }

    return (
        <div className="input-container">
            <h1>Customize & Create Your Room</h1>
            <Input value={name} onChange={changeNameInput} placeholder={"Room name"}/>
            <Input value={capacity} onChange={changeCapacityInput} placeholder={"eg. 16"}/>
            <Input value={privacyType} onChange={changePrivacyInput} placeholder={"Public or Private"}/>
            <RedirectButton name={"Create"} redirectPath={"/rooms"} onClickModifier={createRoom}/> 
        </div>
    )
}