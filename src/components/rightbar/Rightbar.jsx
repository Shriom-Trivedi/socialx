import React from 'react';
import './rightbar.css';
import { jobs, trendingNews, Users } from '../../dummyData';
import { ArrowForward } from '@mui/icons-material';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const RightbarListItem = ({ content, userArr }) => {
  return (
    <li className='trendingItem' key={content.id}>
      <div className='trendingItemContainer'>
        <div className='trendingItemHeading'>
          {(userArr?.profilePicture || content.profilePicture) && (
            <div className='trendingImg'>
              <img
                src={userArr?.profilePicture || content.profilePicture}
                alt=''
                className='trendingItemImg'
              />
            </div>
          )}
          <div className='trendingUserName'>
            {userArr?.username || content.username || content.title}
          </div>
        </div>
        <div className='trendingItemContent'>
          {content.content ||
            content.bio ||
            `${content.company} - ${content.location} `}
        </div>
        {content.date && (
          <div className='trendingItemFooter'>
            <div className='trendingItemFooterLeft'>
              <WhatshotIcon
                sx={{ fontSize: '12px', color: 'var(--text-gray)' }}
              />
            </div>
            <div className='trendingItemFooterCenter'>{content.date}</div>
            {content.views && (
              <div className='trendingItemFooterRight'>
                {content.views} views
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

const TitleCard = ({ title }) => {
  return (
    <div className='trendingHeading'>
      <div className='trendingTitle'>
        <p>{title}</p>
      </div>
      <div className='trendingIcon'>
        <ArrowForward sx={{ fontSize: '20px' }} />
      </div>
    </div>
  );
};

const rightbar = () => {
  return (
    <div className='rightbar'>
      <div className='rightbarContainer'>
        <div className='trendingSection'>
          <TitleCard title='Trending' />
          <ul className='trendingList'>
            {trendingNews.map((news) => {
              const userArr = Users.find((user) => {
                return user.id === news.id;
              });
              return <RightbarListItem userArr={userArr} content={news} />;
            })}
          </ul>
        </div>

        <div className='suggesstedPeople'>
          <TitleCard title='Suggested People' />
          <ul className='suggestedPeopleList'>
            {Users.map((ppl) => {
              return <RightbarListItem content={ppl} />;
            })}
          </ul>
        </div>

        <div className='jobs'>
          <TitleCard title='Jobs' />
          <ul className='jobsList'>
            {jobs.map((job) => {
              return <RightbarListItem content={job} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default rightbar;
