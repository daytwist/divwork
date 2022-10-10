import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { TeamsResponse } from "../../types/teamTypes";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { BackButton } from "../ui/BackButton";

export const TeamsNew = () => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [newTeamName, setNewTeamName] = useState<string>("");

  const handleTeamsCreate = () => {
    const teamsCreateOptions: AxiosRequestConfig = {
      url: "/teams",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { name: newTeamName },
    };

    axiosInstance(teamsCreateOptions)
      .then((res: AxiosResponse<TeamsResponse>) => {
        console.log(res);
        handleSetSnackbar({
          open: true,
          type: "success",
          message: "チームを作成しました",
        });
        navigate("/sign_up", {
          state: {
            teamId: res.data.team.id,
            teamName: res.data.team.name,
            isAdmin: true,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          message: `${err.response.data.messages.join("。")}`,
        });
      });
  };

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          新規チーム作成
        </Typography>
        <Typography variant="body1" component="div">
          新しいチームの管理者としてユーザー登録します。
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          type="text"
          inputProps={{ maxLength: 20 }}
          label="新規チーム名"
          color="secondary"
          helperText="20文字以内"
          value={newTeamName}
          onChange={(event) => setNewTeamName(event.target.value)}
          sx={{ width: "30ch" }}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" onClick={handleTeamsCreate}>
            作成
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
