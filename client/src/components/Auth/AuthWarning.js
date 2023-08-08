import React from "react";
import { Grid } from '@material-ui/core';

const AuthWarning = ({ message, className }) => {
  return (
    <Grid item xs={12} sm={12}>
      <div className={className}>
        {message}
      </div>
    </Grid>
  );
};

export default AuthWarning;
