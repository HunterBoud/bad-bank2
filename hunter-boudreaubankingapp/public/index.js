import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './navbar'; // Assuming you have a NavBar component
import UserContext from './userContext'; // Assuming you have a UserContext component
import Home from './home'; // Assuming you have a Home component
import CreateAccount from './createaccount'; // Assuming you have a CreateAccount component
import Login from './login'; // Assuming you have a Login component
import Deposit from './deposit'; // Assuming you have a Deposit component
import Withdraw from './withdraw'; // Assuming you have a Withdraw component
import Balance from './balance'; // Assuming you have a Balance component
import AllData from './alldata'; // Assuming you have an AllData component

function Spa() {
  // Function to fetch user data from the backend server
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/account/find/user@example.com');
      const userData = await response.json();
      console.log(userData); // Do something with the data from the server, e.g., set it in the UserContext
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);

  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={{ users: [{ name: 'John Doe', email: 'Jdoe@outlook.com', password: 'password1', balance: 100 }] }}>
        <div className="container" style={{ padding: '20px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/balance/" component={Balance} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById('root'));
