import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "../../providers/AuthProvider";
import { LeftDrawer } from "./LeftDrawer";
import { Header } from "./Header";

export const MenuBars = () => {
  const { isSignedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Header onClick={handleDrawerToggle} />
      {isSignedIn ? (
        <LeftDrawer open={open} onClose={handleDrawerToggle} />
      ) : null}
    </Box>
  );
};
