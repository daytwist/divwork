import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { Task } from "../../../types/taskTypes";

type Props = {
  task: Task | undefined;
};

export const NewDivisionButton = (props: Props) => {
  const { task } = props;

  return (
    <div>
      <Tooltip title="分担する" placement="top" arrow>
        <IconButton
          color="primary"
          component={Link}
          to={`/tasks/${task?.id}/divisions/new`}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <ConnectWithoutContactIcon />
        </IconButton>
      </Tooltip>
      <Button
        variant="contained"
        component={Link}
        to={`/tasks/${task?.id}/divisions/new`}
        startIcon={<ConnectWithoutContactIcon />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        分担する
      </Button>
    </div>
  );
};
