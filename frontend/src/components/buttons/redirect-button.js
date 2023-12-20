import { useNavigate } from "react-router-dom";

export default function RedirectButton({name, redirectPath, onClickModifier}) {
    const navigate = useNavigate()

    const onClick = async () => {
        if (onClickModifier){
            const room = await onClickModifier()
            if(room) {
                redirectPath += "/" + room.id
            }
        }
        navigate(redirectPath)
    }

    return (
        <button type="button" onClick={onClick}>{name}</button>
    )
}