/*
 *
 * List
 *
 */

import React from 'react';
import Editable from "../Containers/Editable";

export function Listing(props) {
  const { list, onSort, sort, onDelete } = props;
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm">
        <thead style={{ backgroundColor: '#fdf3ea' }}>
        <tr>
          <th onClick={onSort('name')} style={{ cursor: 'pointer' }}>
            Name <i className={`fa fa-arrow-${sort === 'asc' ? 'down': 'up'}`} aria-hidden="true" />
          </th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Postal Code</th>
          <th>Stars</th>
          <th>Good For Kids</th>
          <th>Hours/Monday</th>
          <th>Hours/Tuesday</th>
          <th> </th>
        </tr>
        </thead>
        <tbody>
        {
          list.map(data => (
            <tr key={data.business_id}>
              <td><Editable field={`name`} html={data.name} id={data.business_id} /></td>
              <td><Editable field={`address`} id={data.business_id} html={data.address || '-'} /></td>
              <td><Editable field={`city`} id={data.business_id} html={data.city} /></td>
              <td><Editable field={`state`} id={data.business_id} html={data.state} /></td>
              <td><Editable field={`postal_code`} id={data.business_id} html={data.postal_code} /></td>
              <td><Editable field={`stars`} id={data.business_id} html={data.stars} /></td>
              <td><Editable tag={`attributes`} field={`GoodForKids`} id={data.business_id} html={data.attributes && data.attributes.GoodForKids ? data.attributes.GoodForKids : '-'} /></td>
              <td><Editable tag={`hours`} field={`Monday`} id={data.business_id} html={data.hours && data.hours.Monday ? data.hours.Monday : '-'  } /></td>
              <td><Editable tag={`hours`} field={`Tuesday`} id={data.business_id} html={data.hours && data.hours.Tuesday ? data.hours.Tuesday : '-'  } /></td>
              <td><span onClick={() => onDelete(data.business_id)}> <i style={{ fontSize: 20, cursor: 'pointer' }} className="fa fa-trash" aria-hidden="true"/> </span></td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
export default Listing;
