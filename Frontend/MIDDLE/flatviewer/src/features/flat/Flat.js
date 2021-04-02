import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFlatsAsync,
	addFavourite,
	removeFavourite
} from './flatSlice';
import './Flat.css';


export function Flat() {
  const flat = useSelector((state) => state.flat.flats);
  const favourites = useSelector((state) => state.flat.favourites);
  const dispatch = useDispatch();
  useEffect(() => {
	  dispatch(getFlatsAsync());
  }, []);
  
  const addToFavourites = id => {
	  dispatch(addFavourite(id));
  }
  const removeFromFavourites = id => {
	  dispatch(removeFavourite(id));
  }

  return (
    <div className="flats">
		{flat.map(flat => 
			<div key={flat.id} className="flat">
				<div>
				<div>
				<p>Title: {flat.attributes.title}</p>
					{favourites[flat.id] ? 
					<button type="button" className="button" onClick={() => removeFromFavourites(flat.id)}>Remove from favourites</button>
					:
					<button type="button" className="button" onClick={() => addToFavourites(flat.id)}>Add to favourites</button>
					}
				</div>
				<p>Rooms: {flat.attributes.rooms}</p>
				<p>Address: {flat.attributes.address.city + ', ' + flat.attributes.address.street + ' ' +
				flat.attributes.address.house + ', room ' + flat.attributes.address.room}</p>
				<p>Area: {flat.attributes.area}</p>
				<p>Unit: {flat.attributes.unit}</p>
				</div>
				<div>
				<p>Agent's name: {flat.relationships.attributes.first_name + ' ' + flat.relationships.attributes.last_name +
				' ' + flat.relationships.attributes.middle_name}</p>
				</div>
			</div>
		)}
    </div>
  );
}
