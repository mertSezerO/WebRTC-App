import { useNavigate } from "react-router-dom";

export default function Button({name, redirectPath}) {
    const navigate = useNavigate()

    function onClick() {
        navigate(redirectPath)
    }

    return (
        <button type="button" onClick={onClick}>{name}</button>
    )
}