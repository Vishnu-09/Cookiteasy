import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loginResult, setLoginResult] = useState('');
  const [dashboardData, setDashboardData] = useState({});
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAction = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handlePost();
    }
  };

  const handlePost = () => {
    axios
      .post('http://localhost:5000/register', { name, email })
      .then((response) => {
        const result = response.data;
        if (result) {
          alert('Data saved successfully');
          setEmail('');
          setName('');
        }
      })
      .catch((error) => {
        console.error('POST request error:', error);
        alert(`${error}`);
      });
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/login', { name, email })
      .then((response) => {
        const result = response.data;
        setLoginResult(result.success ? 'Login successful' : 'Login unsuccessful');
        if (result.success) {
          fetchDashboardData();
          setShowDashboard(true);
        }
      })
      .catch((error) => {
        console.error('Login request error:', error);
        alert('Something went wrong during login.');
      });
  };

  const fetchDashboardData = () => {
    axios
      .get(`http://localhost:5000/dashboard?name=${name}`)
      .then((response) => {
        const data = response.data;
        setDashboardData(data);
      })
      .catch((error) => {
        console.error('Dashboard data request error:', error);
        alert('Failed to fetch dashboard data.');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        textAlign: 'center',
      }}
    >
      {showDashboard ? (
        <div>
          <h1>Welcome to Your Dashboard, {name}!</h1>
          <p>Dashboard Data:</p>
          <ul>
            {Object.entries(dashboardData).map(([key, value]) => (
              <li key={key}>{`${key}: ${value}`}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <hr />
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '5px', margin: '10px' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <label htmlFor="Email">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '5px', margin: '10px' }}
                />
              </div>
              <button
                type="button"
                onClick={handleAction}
                style={{
                  padding: '10px',
                  margin: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                }}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
              <p>{loginResult}</p>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                }}
              >
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
