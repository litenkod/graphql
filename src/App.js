import React, { useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

function App() {
	const [countryName, filter] = useState('');
	const GET_COUNTRY = gql`
	query SelectedCountry($name: String) {
		Country (filter: {name_contains: $name}){
			name
			capital
			flag{
				svgFile
			}
		}
	}
	`
	const { data, loading, error } = useQuery(GET_COUNTRY, { variables: { name: countryName } });
	// if(error) return <p>Error</p>
	// if(loading) return <p>loading...</p>
	
  return (
    <React.Fragment>
    <header>
      <h1>Country</h1>
    </header>
    <div className="search-wrapper">
      <label htmlFor="search">Search</label>
      <input type="text" id="search"  onChange={(e) => filter(e.target.value)} value={countryName}/>
    </div>
    <div className="container">
      {data &&
        data.Country.map((item, index) => (
          <div key={index} className="item">
              <h3>{item.name}</h3>
							{/* <h4>{item.capital}</h4> */}
              <img src={item.flag.svgFile} alt={item.name} />
          </div>
        ))}
    </div>
  </React.Fragment>
  );
}

export default App;
