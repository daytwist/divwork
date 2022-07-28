import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";

const Home: FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="div" gutterBottom>
        DivWork
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Link style={{ textDecoration: "none" }} to="/sign_up/teams/select">
            <Button variant="contained" type="button">
              サインアップ
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link style={{ textDecoration: "none" }} to="/sign_in">
            <Button variant="outlined" type="button">
              サインイン
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
