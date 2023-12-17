import Input from "../components/inputs/input"
import RedirectButton from "../components/buttons/redirect-button"
import InputPanel from "../components/inputs/input-panel";

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
            <div className="input">
                <label htmlFor="name">Room Name</label>
                <Input value={name} onChange={changeNameInput} placeholder={"eg. Movie Night"}/>
            </div>
            <div className="input">
                <label htmlFor="privacyType">Capacity</label>
                <Input value={capacity} onChange={changeCapacityInput} placeholder={"eg. 16"}/>
            </div>
            <div className="input">
                <label htmlFor="privacyType">Privacy Type</label>
                <InputPanel value={privacyType} options={["Public", "Private"]} onChange={changePrivacyInput} placeholder={"Select a Privacy Type"}/>
            </div>
            <RedirectButton name={"Create"} redirectPath={"/rooms"} onClickModifier={createRoom}/> 
        </div>
    )
}