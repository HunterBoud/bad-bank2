function Withdraw() {
  const ctx = React.useContext(UserContext)
  const [showForm, setShowForm] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [withdrawAmount, setWithdrawAmount] = React.useState('');
  const [balance, setBalance] = React.useState(100);
  const [complete, setComplete] = React.useState(false);
  


  function handleFormSubmit(i) {
    i.preventDefault();
    if (!validate(withdrawAmount, 'Withdraw amount')) {
      return;
    }
    console.log(num)
    setBalance(balance - parseFloat(withdrawAmount));
    setStatus('Withdraw successful!');
    setWithdrawAmount('');
    setShowForm(false);
    let total       = ctx.users[0].balance
    let num         = parseFloat(total).toFixed(2)
    let newWithdraw = parseFloat(withdrawAmount).toFixed(2)
    num             = num - newWithdraw
    let totalBal       = parseFloat(num).toFixed(2)
    ctx.users[0].balance = totalBal
    console.log(ctx.users[0].balance)
  }

  function validate(field, label) {
    if (!field) {
      setStatus(`Error: ${label} is required`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (Number.isNaN(Number.parseFloat(field))) {
      setStatus(`Error: ${label} must be a number`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (Number.parseFloat(field) <= 0) {
      setStatus(`Error: ${label} must be greater than zero`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (balance < Number.parseFloat(field)) {
      setStatus(`Error: ${label} cannot exceed remaining balance`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleNewWithdraw() {
    setShowForm(true);
  }

  function handleInput() {
    if (withdrawAmount) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }

  React.useEffect(() => {
    handleInput();
  }, [withdrawAmount]);

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={showForm ? (  
              <>
              <p>Current Balance: ${ctx.users[0].balance}</p>
              <br/>
              Withdraw<br/>
              <input 
              type="input" 
              className="form-control" 
              id="withdrawAmount" 
              placeholder="Enter value" 
              value={withdrawAmount} 
              onChange={(i) => {
                setWithdrawAmount(i.currentTarget.value);
                handleInput();
              }}/><br/>
              <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handleFormSubmit}
              disabled={!complete}>Withdraw</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <p>Your new balance is: ${ctx.users[0].balance}</p>
              <button 
              type="submit" 
              className="btn btn-light" 
              onClick={handleNewWithdraw}>Withdraw again</button>
              </>
            )}
    />
  );
}
