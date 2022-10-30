import { Dispatch, SetStateAction, useEffect } from "react";
import { Drawer, Toolbar, Box, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useFetchTeam } from "../../hooks/team/useFetchTeam";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerList } from "./DrawerList";

type Props = {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

export const LeftDrawer = (props: Props) => {
  const { window, open, setOpen, onClose } = props;
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [teamData, isLoading, error] = useFetchTeam();

  const drawerWidth = 240;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          container={container}
          variant="persistent"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            zIndex: 1200,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <DrawerList onClose={onClose} teamData={teamData} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            zIndex: 1200,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <DrawerList onClose={onClose} teamData={teamData} />
        </Drawer>
      </Box>
    </div>
  );
};
