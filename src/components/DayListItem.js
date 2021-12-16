import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";



export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
 });

 // function that formats the wording related to how many spots are left

 const formatSpots = spots => {
   if (spots === 0) {
     return 'no spots remaining';
   }  else if (spots === 1) {
     return `${spots} spot remaining`;
   } else {
     return `${spots} spots remaining`;
   }
 };


  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}  
    selected={props.selected} ////// added 
    data-testid='day' //
    >

      <h2 className="text--regular">{props.name} </h2> 
     
      <h3 className="text--light">{formatSpots(props.spots)}</h3>

    </li>
  );
}