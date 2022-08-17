import { FC, useEffect, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import { User } from "../types";

const UsersEdit: FC = () => {
  const { user: userData } = useFetchUser();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <div>
      <h1>Users#Edit</h1>
      <p>{user?.name}</p>
    </div>
  );
};

export default UsersEdit;
