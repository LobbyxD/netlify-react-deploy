import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const SERVER = "https://johnbryce-django-deploy.onrender.com/"; // remote
  const [username, setUName] = useState("eyal");
  const [password, setPwd] = useState("123");
  const [myToken, setMyToken] = useState("");
  const [products, setProducts] = useState([]);
  const Login = async () => {
    await axios
      .post(SERVER + "token/", {
        username,
        password,
      })
      .then((res) => setMyToken(res.data.access));
  };
  useEffect(() => {
    const connect = () => async () => {
      await Login();
      await getProducts();
    };
    connect();
  }, []);
  const getProducts = async () => {
    let response = await axios.get(SERVER + "products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    });
    setProducts(response.data);
  };
  return (
    <div className="App">
      {myToken}
      Uname:
      <input onChange={(e) => setUName(e.target.value)} />
      pwd:
      <input type="password" onChange={(e) => setPwd(e.target.value)} />
      <button onClick={() => Login()}>Login</button>
      <button onClick={() => getProducts()}>Get products</button>
      <br />
      <div className="row row-cols-2 row-cols-md-6 g-6">
        {products.map((pr, i) => (
          <div key={i} className="col">
            <div className="card">
              <img
                src={`https://picsum.photos/20${i}`}
                className="card-img-top"
              />
              <div class="card-body">
                <h5 className="card-title">{pr.desc}</h5>
                <p className="card-text">
                  <button className="btn btn-success">BUY</button>
                </p>
              </div>
              <div className="card-footer">
                <small className="card-text">{pr.price}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
