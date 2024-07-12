import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc2NDA3LCJpYXQiOjE3MjA3NzYxMDcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU3ODQzYTgyLTdhM2UtNDM1Yi1hYmI3LTQ4ZjcwY2FiZmYzNyIsInN1YiI6Im5hbWFuLnBpbGFuaWFfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJHbGEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiNTc4NDNhODItN2EzZS00MzViLWFiYjctNDhmNzBjYWJmZjM3IiwiY2xpZW50U2VjcmV0IjoiWVBEUVVmUVZERkNLenJuaSIsIm93bmVyTmFtZSI6Ik5hbWFuIFBpbGFuaWEiLCJvd25lckVtYWlsIjoibmFtYW4ucGlsYW5pYV9jczIxQGdsYS5hYy5pbiIsInJvbGxObyI6IjIxMTUwMDA2NDgifQ.izds5KfuRzz9yrjw9ZkL0aC2aptptzIC6mO_x0INzU4'

  const fetchData = async () => {
    try {
      setError(null);
      const response = await fetch(`http://20.244.56.144/numbers/${numberId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });


      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      console.log(err);
      setError('failed');
    }
  };

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={numberId}
            onChange={handleInputChange}
            placeholder="Enter number ID (p, f, e, r)"
          />
          
          <button type="submit">Fetch</button>
        </form>
        {error && <p className="error">{error}</p>}
        {data && (
          <div className="result">
            <h2>Result</h2>
            <p><h1>Previous Window State:</h1> {JSON.stringify(data.windowPrevState)}</p>
            <p><h1>Current Window State:</h1> {JSON.stringify(data.windowCurrState)}</p>
            <p><h1>Fetched Numbers:</h1> {JSON.stringify(data.numbers)}</p>
            <p><h1>Average:</h1> {data.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
