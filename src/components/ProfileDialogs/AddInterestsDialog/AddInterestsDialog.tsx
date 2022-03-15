import React, { useState } from "react";
import DialogBox from "../../../ui-shared/common/DialogBox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AddInterestsDialog = ({
  isAddInterestsDialogOpen,
  setIsAddInterestsDialogOpen,
}) => {
  const [interests, setInterests] = useState<Array | null>([]);
  return (
    <DialogBox
      isDialogOpen={isAddInterestsDialogOpen}
      setIsDialogOpen={setIsAddInterestsDialogOpen}
    >
      <Autocomplete
        multiple
        limitTags={2}
        id='multiple-limit-tags'
        options={interestaData}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} placeholder='Interests' />
        )}
        value={interests}
        onChange={(event: any, newValue: Array | null) => {
          setInterests(newValue);
        }}
        sx={{
          width: "500px",
          "@media screen and (max-width: 600px)": {
            width: "280px",
          },
        }}
      />
    </DialogBox>
  );
};

const interestaData = [
  {
    name: "Agile methods",
  },
  {
    name: "Activism",
  },
  {
    name: "Authenticity",
  },
  {
    name: "GNI",
  },
  {
    name: "Blockchain",
  },
  {
    name: "Blogging",
  },
  {
    name: "Coaching",
  },
  {
    name: "Corporate Social Responsibility",
  },
  {
    name: "Creative thinking",
  },
  {
    name: "Democracy",
  },
  {
    name: "Digital Media",
  },
  {
    name: "Digital Marketing",
  },
  {
    name: "Digitization",
  },
  {
    name: "Diversity",
  },
  {
    name: "Eco-Design",
  },
  {
    name: "Emancipation",
  },
  {
    name: "Energy efficiency",
  },
  {
    name: "Engagement",
  },
  {
    name: "Development",
  },
  {
    name: "Nutrition",
  },
  {
    name: "Europe",
  },
  {
    name: "Fair Finance",
  },
  {
    name: "Family",
  },
  {
    name: "Finance",
  },
  {
    name: "Refugee Solidarity",
  },
  {
    name: "Freedom",
  },
  {
    name: "Peace",
  },
  {
    name: "Gastronomy",
  },
  {
    name: "Money system",
  },
  {
    name: "Community",
  },
  {
    name: "Genetic engineering",
  },
  {
    name: "Justice",
  },
  {
    name: "Social commitment",
  },
  {
    name: "Graphic Design",
  },
  {
    name: "Basic Income",
  },
  {
    name: "Green Living",
  },
  {
    name: "Impact",
  },
  {
    name: "Improvisation",
  },
  {
    name: "Integration",
  },
  {
    name: "Intercultural communication",
  },
  {
    name: "Journalism",
  },
  {
    name: "Youth",
  },
  {
    name: "Children",
  },
  {
    name: "Climate protection",
  },
  {
    name: "Cooking",
  },
  {
    name: "Cooperation",
  },
  {
    name: "Creativity",
  },
  {
    name: "Food",
  },
  {
    name: "Lifestyle",
  },
  {
    name: "Love",
  },
  {
    name: "Local food",
  },
  {
    name: "Marketing",
  },
  {
    name: "Music",
  },
  {
    name: "Muslim Community",
  },
  {
    name: "Online Marketing",
  },
  {
    name: "Organizational Development",
  },
  {
    name: "Politics",
  },
  {
    name: "Project Management",
  },
  {
    name: "Facilitation",
  },
  {
    name: "Regional",
  },
  {
    name: "Regional Agriculture",
  },
  {
    name: "Regional Development",
  },
  {
    name: "Self-determination",
  },
  {
    name: "Self-reflection",
  },
  {
    name: "Social Media",
  },
  {
    name: "Social Media Marketing",
  },
  {
    name: "Software",
  },
  {
    name: "Social Innovations",
  },
  {
    name: "Social Innovations in the Global South",
  },
  {
    name: "Social value added",
  },
  {
    name: "Social Theater",
  },
  {
    name: "Sufficiency",
  },
  {
    name: "Unconscious bias",
  },
  {
    name: "Event Management",
  },
  {
    name: "Connectedness promotion",
  },
  {
    name: "Association Foundation",
  },
  {
    name: "Virtual Teams",
  },
  {
    name: "World Food",
  },
  {
    name: "World Peace",
  },
  {
    name: "Economy of the Future",
  },
  {
    name: "Zeitgeist",
  },
  {
    name: "Sustainable Society",
  },
  {
    name: "Change management",
  },
];

export default AddInterestsDialog;
