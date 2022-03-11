import React from "react";
import DialogBox from "../../../ui-shared/common/DialogBox";
import RichTextEditor from "../../../ui-shared/common/RichTextEditor/RichTextEditor";

const AddAboutDialog = ({ isAddAboutDialogOpen, setAddAboutIsDialogOpen }) => {
  return (
    <DialogBox
      isDialogOpen={isAddAboutDialogOpen}
      setIsDialogOpen={setAddAboutIsDialogOpen}
    >
      <RichTextEditor />
    </DialogBox>
  );
};

export default AddAboutDialog;
