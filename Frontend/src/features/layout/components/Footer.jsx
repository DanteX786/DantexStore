import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "white",
        textAlign: "center",
        py: 3,
        mt: 4,
      }}
    >
      <Typography variant="body1">
        © 2026 DanteXStore
      </Typography>

      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        Todos los derechos reservados
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        Link Git: https://github.com/DanteX786/DantexStore
      </Typography>
    </Box>
  );
}

export default Footer;