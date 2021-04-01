import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	
} from './flatSlice';
import './Flat.css';

export function Flat() {
  const flat = useSelector((state) => state.flat.flats);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
		{flat.map(flat => 
			<div key={flat.id}>
				<div>
				Title: {flat.attributes.title}
				Rooms: {flat.attributes.rooms}
				Address: {flat.attributes.address.city + ' ' + flat.attributes.address.street + ' ' +
				flat.attributes.address.house + ' ' + flat.attributes.address.room}
				Area: {flat.attributes.area}
				Unit: {flat.attributes.unit}
				</div>
				<div>
				Type: {flat.relationships.type}
				Name: {flat.relationships.attributes.first_name + ' ' + flat.relationships.attributes.last_name +
				' ' + flat.relationships.attributes.middle_name}
				</div>
			</div>
		)}
    </div>
  );
}
