import React from 'react';
import SidebarOption from './SidebarOption';

const Sidebar = props => {
  let ii=0;
  let options = ["Task List", "Wish List", "Fun Fund"].map((option) => {
    let className = "";
    if (option === props.dashboardContent) {
      className = "sidebar-selected";
    }

    ii++;
    return(
      < SidebarOption
        key = { ii }
        name = { option }
        className = { className }
        changeDashboardContent = { props.changeDashboardContent }
      />
    )
  })

  return(
    <div className="small-2 columns sidebar">
      <ul className="menu vertical">
        {options}
      </ul>
    </div>
  )
}

export default Sidebar;
