function Login(props) {
  const [show, setShow] = React.useState(true);
  const { logOut } = React.useContext(UserContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { userName, setUsername } = React.useContext(UserContext);
  const { userBalance, setUserBalance } = React.useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext);
  const { userEmail, setUserEmail } = React.useContext(UserContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [status, setStatus] = React.useState(''); // Add status state

  React.useEffect(() => {
    checkIfLoggedIn();
    if (isLoggedIn === true) {
      const newUserName = window.localStorage.getItem('token');
      const parsedUserInfo = JSON.parse(newUserName);
      setUsername(parsedUserInfo.userName);
      setUserBalance(parsedUserInfo.userBalance.toFixed(2));
    }
  }, [isLoggedIn]);

  async function handleLogin() {
    const url = `/account/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;

    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        JSON.stringify(localStorage.setItem("loggedIn", true));
        localStorage.setItem("usersEmail", JSON.stringify(data.token.userEmail));
        setUsername(data.token.userName);
        const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"));
        setIsLoggedIn(updatedLogin);
        localStorage.setItem("usersBalance", JSON.stringify(data.token.userBalance.toFixed(2)));
        setUserBalance(data.token.userBalance);
        setStatus(''); // Clear any previous status message
        setShow(false);
      } else {
        console.log('Login failed:', res.statusText);
        setIsVisible(true);
        setStatus('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setStatus('An error occurred during login. Please try again later.');
    }
  }

  function checkIfLoggedIn() {
    if(localStorage.getItem("token")){
      setShow(false);
      const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"));
      setIsLoggedIn(firstLoginCheck);
    } else {
      setShow(true);
    }
  }

  function clearForm() {
    setEmail('');
    setPassword('');
    setShow(false);
  }

  return ( 
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? (  
        <>
          <br/>
          Email address<br/>
          <input 
            type="input" 
            className="form-control" 
            id="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={i => setEmail(i.currentTarget.value)}
          /><br/>
          Password<br/>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={i => setPassword(i.currentTarget.value)}
          /><br/>
          <button 
            type="submit" 
            className="btn btn-light" 
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h5>Welcome!</h5>
        </>
      )}
    />   
  );
}

  
