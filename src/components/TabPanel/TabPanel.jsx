import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Posts } from '../../dummyData';
import Post from '../post/Post';
import Share from '../share/Share';
import About from '../About/About';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import Feed from '../feed/Feed';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ username, user }) {
  const [value, setValue] = React.useState(0);
  // TODO: write login to show share tab when required
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label={user?.name} {...a11yProps(0)} />
          <Tab label='Post' {...a11yProps(1)} />
          <Tab label='Coming Soon...' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <About
          label='About'
          tooltip='Edit About'
          title='Share something about yourself'
          desc='Use Markdown to share more about who you are with the world on SOCIALX'
          buttonText='Add About'
          type='about'
        />
        <About
          label='Interests'
          tooltip='Edit Interests'
          title='Share what interests you'
          desc='Use Markdown to share more of your interests with the world and let then know who you are.'
          buttonText='Add Interests'
          type='interests'
        />
        <About
          label='Details'
          tooltip='Edit Details'
          title='Share your basic details with the world'
          desc='Use Markdown to share more of your details with the world like birthday, relationship status and much more.'
          buttonText='Add Details'
          type='details'
        />
        <About
          label='Positions'
          tooltip='Edit Positions'
          title='Share a timeline of your positions'
          desc={`Add your professional history so others know you've put your skills to good use.`}
          buttonText='Add Positions'
          type='positions'
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Feed username={username} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        This area is under construction...
      </TabPanel>
    </Box>
  );
}
