import React from 'react'
import {useState} from 'react'
import  {useNavigate, Link} from 'react-router-dom'
import '../../css/RegisterForm.css'


const RegisterForm = ({signup, createProfile}) => {

  // definining the initial state as an object of username and password with empty strings
  const initialState = { username: "", password: ""}

  // defining the state of the input and setting it to initial state username/pw
  const [input, setInput] = useState(initialState)

  const [profileForm] = useState({
    usernameProfile: `${input.username}`,
    bioProfile: "",
    owner: `${input.username}`,
  });

  // useNavigate returns an imperative method that you can use for changing location.
	const navigate = useNavigate()

  // event handler for submitted Register info
  const handleSubmit = async (e) => {

  // Clicking on a "Submit" button, this prevents it from submitting a form
    e.preventDefault()

  // gets user token from register user from App.js component
    const createdUserToken = await signup(input)

    const createdUserProfile = await createProfile(profileForm)

    if (createdUserToken && createdUserProfile) {
      navigate(`/rooms`)
    } else {
      navigate("/")
    }

    // set state as new username and password on submit
		setInput(initialState);
  };

  // save new state with password and value on event change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Register Form JSX and export
  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          maxLength="17"
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
      <Link to={'/login'} >
      <h2> sign in instead</h2>
      </Link>
    </div>
  );
};

export default RegisterForm;
