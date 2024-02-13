import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds', {
      params: {
        limit: 10,
        page: 0
      }
    })
    .then(response => {
      setBreeds(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const getBreedDetails = (breedId) => {
    axios.get(`https://api.thecatapi.com/v1/breeds/${breedId}`)
      .then(response => {
        //console.log(response.data.image);
        setSelectedBreed(response.data);
      })
      .catch(error => {
        console.error('Error fetching breed details:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table>
        <thead>
          <tr>
            <th>Breed Name</th>
            <th>Breed Origin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map(breed => (
            <tr key={breed.id}>
              <td>{breed.name}</td>
              <td>{breed.origin}</td>
              <td>
                <button onClick={() => getBreedDetails(breed.id)}>Get Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBreed && (
        <div>
         {/* <h3 >{selectedBreed.image.id}  </h3> */}
          <img src={selectedBreed.image} alt={selectedBreed.name}  style={{width:'50px',height:'50px'}}/>
          <h2>{selectedBreed.name}</h2>
          <p><strong>Name:</strong> {selectedBreed.name}</p>
          <p><strong>Origin:</strong> {selectedBreed.origin}</p>
          <p><strong>Weight (in metric):</strong> {selectedBreed.weight.metric}</p>
          <p><strong>Weight (in metric):</strong> {selectedBreed.hairless ? 'Yes' : 'No'}</p>
        
          <p><strong>Wikipedia Link:</strong> <a href={selectedBreed.wikipedia_url} target="_blank" rel="noopener noreferrer">More Info</a></p>
        </div>
      )}
    </div>
  );
}

export default App;
