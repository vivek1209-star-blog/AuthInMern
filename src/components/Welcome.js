import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const sednRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);



  const handleChange = e => {
    setValue(e.target.value);
    setResult("");
  }

  const isPrime = num => {
    for(let i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
  }

  const handleClick = _ => {
    if (isNaN(value)) {
      setResult("ERROR");
    } else {
      const res = isPrime(parseInt(value, 10)) ? "YES": "NO";
      setResult(res);
    }
  }

  let text = "";
  let classValue = "";

  if (result === "YES") {
    text = `${value} is a prime number`;
    classValue = "success panel";
  } else if (result === "NO") {
    text = `${value} is not a prime number`;
    classValue="error panel";
  } else if (result === "ERROR") {
    text = `${value} is not a number`;
    classValue="error panel";
  }

  return (
    <div className="App">
       <div>{user && <h1>{user.name}</h1>}</div>
    <div>
      <p>Enter number to verify prime number</p>
      <input type="text" className="input" value={value} onChange={handleChange}/>
    </div>
    <div>
      <button className="button" onClick={handleClick}>Check</button>
    </div>
    <div className={ classValue }>{text}</div>
  </div>
  )
 ;
};

export default Welcome;
