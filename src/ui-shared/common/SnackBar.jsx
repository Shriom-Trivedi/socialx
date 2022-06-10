import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({ variant, message }) {
  const { enqueueSnackbar } = useSnackbar();

  // variant could be success, error, warning, info, or default
  enqueueSnackbar(message, { variant });
  return null;
}

export default function IntegrationNotistack({ snackbar }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp variant={snackbar.variant} message={snackbar.message} />
    </SnackbarProvider>
  );
}
