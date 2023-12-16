import { useNavigate } from "react-router-dom";

export default function RedirectButton({name, redirectPath, onClickModifier}) {
    const navigate = useNavigate()

    function onClick() {
        if (onClickModifier){
            const room = onClickModifier()
            redirectPath += "/" + room.id
        }
        navigate(redirectPath)
    }

    return (
        <button type="button" onClick={onClick}>{name}</button>
    )
}