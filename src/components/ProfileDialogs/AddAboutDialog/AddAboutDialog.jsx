import React from "react";
import DialogBox from "../../../ui-shared/common/DialogBox";
import RichTextEditor from "../../../ui-shared/common/RichTextEditor/RichTextEditor";

const AddAboutDialog = ({ isAddAboutDialogOpen, setIsAddAboutIsDialogOpen }) => {
  return (
    <DialogBox
      isDialogOpen={isAddAboutDialogOpen}
      setIsDialogOpen={setIsAddAboutIsDialogOpen}
    >
      <RichTextEditor />
    </DialogBox>
  );
};

export default AddAboutDialog;
