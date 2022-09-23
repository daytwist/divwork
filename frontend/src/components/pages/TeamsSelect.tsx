import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { Team, TeamsResponse, TeamsSelectResponse } from "../../types";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const TeamsSelect: FC = () => {
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [newTeamName, setNewTeamName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamId(value);

    const teamIdNumber = Number(value);
    const selectTeam: Team | undefined = teams.find(
      (v) => v.id === teamIdNumber
    );
    console.log(selectTeam);

    if (selectTeam) {
      setTeamName(selectTeam.name);
    }
  };

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

        if (res.status === 201) {
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
        }
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

  const options: AxiosRequestConfig = {
    url: "/teams/select",
    method: "GET",
  };

  useEffect(() => {
    axiosInstance(options)
      .then((res: AxiosResponse<TeamsSelectResponse>) => {
        console.log(res);
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid2 container direction="column" rowSpacing={3}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          所属チームの選択
        </Typography>
        <Typography variant="subtitle1" component="div">
          選択したチームでユーザー登録します。
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          select
          required
          label="チーム"
          color="secondary"
          sx={{ width: "30ch" }}
          name="id"
          value={teamId}
          defaultValue=""
          onChange={handleChange}
        >
          {teams?.map((menu) => (
            <MenuItem key={menu.id} value={menu.id}>
              {menu.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>
      <Grid2 xs={12}>
        <Button variant="contained" type="button">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/sign_up"
            key={teamId}
            state={{ teamId, teamName, isAdmin: false }}
          >
            次へ
          </Link>
        </Button>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="subtitle1" component="div" sx={{ my: 2, ml: 13 }}>
          または
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div" gutterBottom>
          新規チーム作成
        </Typography>
        <Typography variant="subtitle1" component="div">
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
        <Button type="submit" variant="contained" onClick={handleTeamsCreate}>
          作成
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TeamsSelect;
