const users = [
  {
    id: 1,
    name: "Anna Smith",
    role: "Developer",
    active: true,
  },
  {
    id: 2,
    name: "Peter Brown",
    role: "Designer",
    active: false,
  },
];

interface UserCardProps {
  id: number;
  name: string;
  role: string;
  active: boolean;
  onRemove: (id: number) => void;
}

interface UserListProps {
  users: UserCardProps[];
}

export const UserCard = ({
  id,
  name,
  role,
  active,
  onRemove,
}: UserCardProps) => {
  return (
    <div>
      <div>{active ? "Active" : "Inactive"}</div>
      <div>{name}</div>
      <div>{role}</div>
      <button onClick={() => onRemove(id)}>Delete</button>
    </div>
  );
};

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          role={user.role}
          active={user.active}
          onRemove={user.onRemove}
        />
      ))}
      ;
    </>
  );
};

export default UserList;
