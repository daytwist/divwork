import { ChangeEvent, useEffect, useState } from "react";
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
import { useFetchTeam } from "../../hooks/team/useFetchTeam";
import { EditTeam } from "../../types/teamTypes";
import { BackIconButton } from "../ui/BackIconButton";
import { LoadingColorRing } from "../ui/LoadingColorRing";
import { usePatchTeam } from "../../hooks/team/usePatchTeam";

export const TeamsEdit = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [teamData, isLoading, error] = useFetchTeam();
  const [team, setTeam] = useState<EditTeam>({
    name: "",
    max_num_of_users: 10,
  });

  const handleUpdateTeam = usePatchTeam({ team });

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

  const numOfUsers = teamData?.users ? teamData?.users.length : 1;
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

  useEffect(() => {
    if (teamData?.team) {
      setTeam(teamData.team);
    }
  }, [teamData?.team]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingColorRing />;
  }

  return (
    <Grid2 container direction="column" rowSpacing={4}>
      <Grid2 xs={12}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BackIconButton />
          <Typography variant="h4" component="div">
            チーム設定
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <TextField
          required
          inputProps={{ maxLength: 20 }}
          label="チーム名"
          variant="outlined"
          color="secondary"
          sx={{ width: "30ch" }}
          helperText="20文字以内"
          name="name"
          value={team?.name}
          onChange={handleInputChange}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControl required sx={{ width: 100 }} color="secondary">
            <InputLabel id="max_num_of_users_label">上限人数</InputLabel>
            <Select
              labelId="max_num_of_users_label"
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
          onClick={handleUpdateTeam}
        >
          更新する
        </Button>
      </Grid2>
    </Grid2>
  );
};
