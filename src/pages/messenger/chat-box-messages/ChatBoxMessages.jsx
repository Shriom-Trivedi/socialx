import './chatBoxMessages.css';

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img src='/assets/person/2.jpeg' alt='msgImg' className='messageImg' />
        <p className='messageText'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          debitis neque voluptate saepe, laudantium non quibusdam porro
          molestiae aperiam, unde culpa odit.
        </p>
      </div>
      <div className='messageBottom'>
        <span>2 hours ago</span>
      </div>
    </div>
  );
};

const ChatBoxMessages = () => {
  return (
    <div className='chatBoxMessages'>
      <div className='chatBoxMessagesWrapper'>
        <div className="chatBoxTopbar">
          
        </div>
        <div className='messages'>
          <Message />
          <Message own={true} />
          <Message />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxMessages;
