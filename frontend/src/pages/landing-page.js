import RedirectButton from "../components/buttons/redirect-button";

export default function LandingPage() {
    return (
        <div className="container">
            <h1>Real Time Voice Chat App</h1>
            <RedirectButton name={"Create a Room"} redirectPath={"/create"} />
            <RedirectButton name={"Join to a Room"} redirectPath={"/rooms"} />
        </div>
    )
}