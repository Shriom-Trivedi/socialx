import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./about.css";
import { Tooltip } from "@mui/material";
import AlertDialog from "../../ui-shared/common/Dialog";

const About = ({ label, tooltip, title, desc, buttonText }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <div className='aboutContainer'>
      <div className='aboutWrapper'>
        <div className='aboutTop'>
          <div className='aboutTitle'>
            <span>{label}</span>
          </div>
          <div className='aboutIcons'>
            <Tooltip title={tooltip} arrow>
              <div className='aboutEditIcon'>
                <EditIcon style={{ color: "#555555", fontSize: "16px" }} />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className='aboutBottom'>
          <div className='addAbout'>
            <div className='addAboutItems'>
              <p className='addAboutItemsTitle'>{title}</p>
              <p className='addAboutItemsDesc'>{desc}</p>
              <button className='addAboutBtn' onClick={handleClickOpen}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      ></AlertDialog>
    </div>
  );
};

export default About;
