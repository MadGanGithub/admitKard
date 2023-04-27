import React from 'react';
import SideBar from '../components/sideBar.js';

const dashboard = () => {
  return (
    <div>
      <div className='row' style={{backgroundColor:'red'}}>
        <div className='col-auto' style={{position:'fixed',height:"80%"}}>
        <SideBar/>
        </div>
      </div>


    </div>
  )
}

export default dashboard
