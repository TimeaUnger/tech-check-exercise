import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "John",
    clicks: 0,
  },
  {
    id: 2,
    name: "Anna",
    clicks: 0,
  },
  {
    id: 3,
    name: "Peter",
    clicks: 0,
  },
  {
    id: 4,
    name: "Sarah",
    clicks: 0,
  },
];

const UsersClickCount = () => {
  const [users, setUsers] = useState(usersData);

  const handleClick = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (id === user.id) {
          return {
            ...user,
            clicks: user.clicks + 1,
          };
        }

        return user;
      }),
    );
  };

  const totalCount = users.reduce((total, user) => {
    return total + user.clicks;
  }, 0);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <button onClick={() => handleClick(user.id)}>Count click</button>
          <span> {user.clicks}</span>
          <hr></hr>
        </div>
      ))}

      <div>Total Count: {totalCount}</div>
    </div>
  );
};

export default UsersClickCount;
