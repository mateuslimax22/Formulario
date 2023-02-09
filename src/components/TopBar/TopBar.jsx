import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Formulário
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
