<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>

  <!-- React + ReactDOM via CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  @verbatim
<script type="text/babel">
  function Home() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch("http://127.0.0.1:8000/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Profile saved!");
        setFirstName("");
        setLastName("");
      } else {
        setMessage("❌ Error: " + data.message);
      }
    };

    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Welcome to Home Page</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<Home />);
</script>
@endverbatim
