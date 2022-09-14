import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { Team, TeamsResponse, TeamsSelectResponse } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const TeamsSelect: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
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
    <div>
      {isSignedIn && <Navigate to={`/teams/${currentUser?.team_id}`} />}
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            所属チームの選択
          </Typography>
          <Typography variant="subtitle1" component="div">
            選択したチームでユーザー登録します。
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="チーム"
            sx={{ width: "25ch" }}
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
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ my: 2, ml: 13 }}
          >
            または
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            新規チーム作成
          </Typography>
          <Typography variant="subtitle1" component="div">
            新しいチームの管理者としてユーザー登録します。
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="新規チーム名"
            value={newTeamName}
            onChange={(event) => setNewTeamName(event.target.value)}
            sx={{ width: "25ch" }}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" onClick={handleTeamsCreate}>
            作成
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamsSelect;
