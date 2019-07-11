/*
 *
 * List
 *
 */

import React from 'react';
import Editable from "../Containers/Editable";

export function Listing(props) {
  const { list, handleChange } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm">
        <thead style={{ backgroundColor: '#fdf3ea' }}>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Postal Code</th>
          <th>Stars</th>
          <th>Good For Kids</th>
          <th>Hours/Monday</th>
          <th>Hours/Tuesday</th>
        </tr>
        </thead>
        <tbody>
        {
          list.map(data => (
            <tr key={data.business_id}>
              <td><Editable html={data.name} onChange={handleChange} /></td>
              <td><Editable html={data.address || '-'} onChange={handleChange} /></td>
              <td>{ data.city}</td>
              <td>{ data.state}</td>
              <td>{ data.postal_code}</td>
              <td>{ data.stars}</td>
              <td>{ data.attributes && data.attributes.GoodForKids ? data.attributes.GoodForKids : '-' }</td>
              <td>{ data.hours && data.hours.Monday ? data.hours.Monday : '-'  }</td>
              <td>{ data.hours && data.hours.Tuesday ? data.hours.Tuesday : '-'  }</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
export default Listing;
