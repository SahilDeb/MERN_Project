import { Message, Segment, Form, Button, Icon } from "semantic-ui-react";
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    setUser(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setErrorMsg('');
      // Request to signup user
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    }
    catch(err) {
      catchErrors(err, setErrorMsg);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        icon="privacy"
        header="Welcome Back!"
        content="Log in with email and password"
        color="blue"
      />
      <Form onSubmit={handleSubmit} loading={loading} error={Boolean(errorMsg)} >
        <Message error header="Oops!" content={errorMsg} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button 
            icon="sign in"
            color="orange"
            type="submit"
            content="Login"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{' '}
        <Link href="/signup">
          <a>Sign Up here</a>
        </Link>{' '}instead.
      </Message>
    </>
  );
}

export default Login;
