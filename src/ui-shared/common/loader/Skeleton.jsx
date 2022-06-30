import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function Media(props) {
  const screenSize = window.innerWidth;
  return (
    <Card
      sx={{
        width: '90%',
        marginY: 3,
        ['@media (max-width:918px)']: {
          // eslint-disable-line no-useless-computed-key
          width: '100%',
        },
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation='wave'
            variant='circular'
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation='wave' height={10} width='40%' />}
      />
      <Skeleton
        sx={{
          height: 400,
          ['@media (max-width:918px)']: {
            // eslint-disable-line no-useless-computed-key
            height: 180,
          },
        }}
        animation='wave'
        variant='rectangular'
      />

      <CardContent>
        <React.Fragment>
          <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={10} width='80%' />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonLoader() {
  return (
    <div>
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
    </div>
  );
}
