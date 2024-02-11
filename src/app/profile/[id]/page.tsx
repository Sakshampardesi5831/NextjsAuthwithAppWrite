import React, { Fragment } from 'react'

const UserProfile = ({params}:any) => {
    return (
        <Fragment>
          <div className='flex flex-col items-center justify-center min-h-screen py-2'>
              <h1>Profile</h1>
              <hr />
              <p className='text-2xl font-bold'
              >{params.id}</p>
          </div>
        </Fragment>
       )
}

export default UserProfile