import { Message, Segment, Form, Button, Icon } from "semantic-ui-react";
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
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
      console.log(user);
      // Request to signup user
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
        icon="settings"
        header="Getting Started!"
        content="Create a new account"
        color="teal"
      />
      <Form onSubmit={handleSubmit} loading={loading} error={Boolean(errorMsg)} >
        <Message error header="Oops!" content={errorMsg} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
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
            icon="signup"
            color="orange"
            type="submit"
            content="Signup"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{' '}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{' '}instead.
      </Message>
    </>
  );
}

export default Signup;
