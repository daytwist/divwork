import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BackButton } from "../ui/BackButton";
import { usePostTeam } from "../../hooks/team/usePostTeam";

export const TeamsNew = () => {
  const [newTeamName, setNewTeamName] = useState<string>("");
  const handleCreateTeam = usePostTeam(newTeamName);

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
          <Button type="submit" variant="contained" onClick={handleCreateTeam}>
            作成
          </Button>
          <BackButton />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
