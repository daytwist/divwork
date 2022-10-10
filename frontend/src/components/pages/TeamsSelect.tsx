import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { Team, TeamsSelectResponse } from "../../types";
import { BackButton } from "../ui/BackButton";

export const TeamsSelect = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string | number>("");
  const [teamName, setTeamName] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const { value } = event.target;
    setTeamId(value);

    const selectTeam: Team | undefined = teams.find((v) => v.id === value);
    console.log(selectTeam);

    if (selectTeam) {
      setTeamName(selectTeam.name);
    }
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
        <Typography variant="body1" component="div">
          選択したチームでユーザー登録します。
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <FormControl required sx={{ width: 300 }} color="secondary">
          <InputLabel id="team_label">チーム</InputLabel>
          <Select
            labelId="team_label"
            value={teamId}
            onChange={handleSelectChange}
            input={<OutlinedInput label="チーム" />}
            MenuProps={MenuProps}
          >
            {teams?.map((menu) => (
              <MenuItem key={menu.id} value={menu.id}>
                {menu.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            component={Link}
            to="/sign_up"
            key={teamId}
            state={{ teamId, teamName, isAdmin: false }}
          >
            次へ
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="body1" component="div">
          または
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/sign_up/teams/new"
        >
          新規チーム作成
        </Button>
      </Grid2>
    </Grid2>
  );
};
