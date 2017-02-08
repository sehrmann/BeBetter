import React from 'react';

const SidebarOption = props => {
  let changeContent = () => {
    return(props.changeDashboardContent(props.name));
  }

  return(
    <li className={props.className} onClick={changeContent}>
      <a>{props.name}</a>
    </li>
  )
}

export default SidebarOption;
