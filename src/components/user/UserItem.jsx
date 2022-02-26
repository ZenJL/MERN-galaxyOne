import React from 'react';

import { Avatar, Image } from 'antd';

//// Components
import Card from '../Card';

function UserItem({ user }) {
  return (
    <>
      <div className='userItem'>
        <Card>
          <div className='userContent'>
            <div className='wrapAvatar'>
              <div className='avatarUser'>
                <img
                  className='avatarImg'
                  src={
                    user.avatar
                      ? user.avatar
                      : 'https://joeschmoe.io/api/v1/random'
                  }
                  alt='avatar'
                />
              </div>
            </div>
            <p className='shortUserDesc'>{`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default UserItem;
