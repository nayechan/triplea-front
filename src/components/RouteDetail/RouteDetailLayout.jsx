import React from 'react';
import Sidebar from './Sidebar';

const Page = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="canvas">
        {/* Main content goes here */}
        <h1>Main Content</h1>
      </div>
      <div className="floating-menu">
        {/* Right upper floating menu button goes here */}
        <button>Menu</button>
      </div>
    </div>
  );
};

export default Page;
