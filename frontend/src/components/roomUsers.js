import User from "./user";

export default function UsersTable({ users }) {
    return (
        <div className="shared-container">
            { users.map((user, id) => (
                <User user={user} key={id} />
            ))}
        </div>
    )
}