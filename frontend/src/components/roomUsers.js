import User from "./user";

export default function UsersTable({ users }) {
    return (
        <div className="shared-container">
            { users.map((user) => (
                <User user={user} />
            ))}
        </div>
    )
}