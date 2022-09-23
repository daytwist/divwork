import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import { useFetchTeam } from "../../hooks/useFetchTeam";
import { EditTeam, TeamsResponse } from "../../types";
import { AuthContext } from "../../providers/AuthProvider";
import { SnackbarContext } from "../../providers/SnackbarProvider";

const TeamsEdit: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleSetSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { team: teamData, users } = useFetchTeam();
  const [team, setTeam] = useState<EditTeam>({
    name: "",
    max_num_of_users: 10,
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const numOfUsers = users ? users.length : 1;
  const numbers: number[] = [];
  for (let i = numOfUsers; i < 21; i += 1) {
    numbers.push(i);
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };

  const handleInputSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };

  const handleTeamsUpdate = () => {
    const options: AxiosRequestConfig = {
      url: `/teams/${params.id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "access-token": Cookies.get("_access_token") || "",
        client: Cookies.get("_client") || "",
        uid: Cookies.get("_uid") || "",
      },
      data: team,
    };

    axiosInstance(options)
      .then((res: AxiosResponse<TeamsResponse>) => {
        console.log(res);

        if (res.status === 200) {
          handleSetSnackbar({
            open: true,
            type: "success",
            message: "チーム情報を更新しました",
          });
          navigate(`/teams/${currentUser?.team_id}`, { replace: false });
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetSnackbar({
          open: true,
          type: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
          message: err.response.data.errors.full_messages.join("。"),
        });
      });
  };

  useEffect(() => {
    if (teamData) {
      setTeam(teamData);
    }
  }, [teamData]);

  return (
    <Grid2 container direction="column" rowSpacing={4}>
      <Grid2 xs={12}>
        <Typography variant="h4" component="div">
          チーム設定
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          label="チーム名"
          variant="standard"
          color="secondary"
          sx={{ width: "30ch" }}
          name="name"
          value={team?.name}
          onChange={handleInputChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControl sx={{ width: 100 }} color="secondary">
            <InputLabel id="max_num_of_users_label">上限人数</InputLabel>
            <Select
              labelId="max_num_of_users_label"
              id="max_num_of_users"
              name="max_num_of_users"
              value={team.max_num_of_users}
              onChange={handleInputSelectChange}
              input={<OutlinedInput label="上限人数" />}
              MenuProps={MenuProps}
            >
              {numbers.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body1" component="div">
            人
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleTeamsUpdate}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TeamsEdit;
