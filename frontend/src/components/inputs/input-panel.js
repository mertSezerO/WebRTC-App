export default function InputPanel({value, options, onChange, placeholder}) {
    return (
        <select
            id="privacyType"
            value={value}
            onChange={onChange}
        >
        <option value="">{placeholder}</option>
        {options.map((option, id) => (
            <option value={option} key={id}>{option}</option>
        ))}
        </select>
    )
}