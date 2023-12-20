export default function ActionButton({ name, onClick }) {
    return (
        <button type="button" onClick={onClick}>{name}</button>
    )
}