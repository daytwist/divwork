import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { User } from "../types";

type Props = {
  user: User | undefined;
};

export const TasksButtons = (props: Props) => {
  const { user } = props;
  const { currentUser } = useContext(AuthContext);

  return (
    <Grid container direction="row" justifyContent="space-between">
      {user?.id === currentUser?.id && (
        <Grid item>
          <Button
            variant="contained"
            type="button"
            component={Link}
            to="/tasks/new"
          >
            新規作成
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button type="button" component={Link} to={`/users/${user?.id}`}>
          未了
        </Button>
        <Button
          type="button"
          component={Link}
          to={`/users/${user?.id}/finished`}
        >
          完了済み
        </Button>
      </Grid>
    </Grid>
  );
};
