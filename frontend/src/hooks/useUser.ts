import { useState, useEffect } from "react";
import { userApi } from "../apis/user";
import { UsersResponse } from "../types/userTypes";

export const useUser = (
  userId: string | undefined,
  reloadFlag: boolean
): [
  UsersResponse | undefined,
  boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any | undefined
] => {
  const [userData, setUserData] = useState<UsersResponse>();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!userId) return undefined;
    const abortCtrl = new AbortController();
    userApi
      .getUser<UsersResponse>(userId)
      .then((result) => {
        console.log(result);
        setUserData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
    return () => {
      abortCtrl.abort();
    };
  }, [userId, reloadFlag]);

  return [userData, isLoading, error];
};
