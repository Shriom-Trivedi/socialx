import React from "react";
import AlertDialog from "../../../ui-shared/common/Dialog";
import RichTextEditor from "../../../ui-shared/common/RichTextEditor/RichTextEditor";

const AddAboutDialog = ({ isAddAboutDialogOpen, setAddAboutIsDialogOpen }) => {
  return (
    <AlertDialog
      isDialogOpen={isAddAboutDialogOpen}
      setIsDialogOpen={setAddAboutIsDialogOpen}
    >
      <RichTextEditor />
    </AlertDialog>
  );
};

export default AddAboutDialog;
