import { useState } from "react";

function App() {
  const apiKey = "d6b4c92111324d9e905163859250811";
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const URL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}&aqi=no`;
  const searchHandle = async () => {
    if (input.trim() !== "") {
      try {
        const res = await fetch(URL);
        const result = await res.json();
        if (result.error) {
          setError(true);
          setResult(null);
          return false;
        } else {
          setResult(result);
          setError(false);
          setInput("");
        }
      } catch (err) {
        setError(true);
        setResult(null);
      }
    }
  };

  return (
    <>
      <div className="main">
        <div className="box">
          <h1>Search Weather</h1>
          <input
            type="text"
            placeholder="City"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={searchHandle}>Search</button>
        </div>

        {error ? (
          <h3 className="errorMessage">Oops! Please type correct city</h3>
        ) : (
          <>
            {result ? (
              <div className="box2 box">
                <div className="location">
                  <h2>{result.location.name}</h2>
                  <span>
                    {result.location.region}
                    {" " + result.location.country}
                  </span>
                  <p>{result.current.last_updated}</p>
                </div>
                <div className="degree">
                  <h3>
                    Temp {result.current.temp_c} <label>℃</label>
                  </h3>
                  <p>
                    Wind Speed <span> {result.current.wind_kph}</span> kph
                  </p>
                </div>
                <div className="img">
                  <p>{result.current.condition.text}</p>
                  <img
                    src={result.current.condition.icon}
                    alt={result.current.condition.icon || "Weather Icon"}
                  />
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default App;
