import Button from "../components/button";

export default function LandingPage() {
    return (
        <div className="container">
            <h1>Real Time Voice Chat App</h1>
            <Button name={"Create a Room"} redirectPath={"/create"} />
            <Button name={"Join to a Room"} redirectPath={"/rooms"} />
        </div>
    )
}