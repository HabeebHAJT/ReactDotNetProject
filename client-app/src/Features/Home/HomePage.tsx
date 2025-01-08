
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../App/Store/store";
import Login from "../users/Login";
import Register from "../users/Register";



function HomePage() {

    const { userStore, modelStore } = useStore()

    return (

        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/Assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header content="Welcome to react activities" inverted as="h2" />
                        <Button as={Link} to="/activities" size="huge" inverted>Go To Activities</Button>
                    </>
                ) : (
                    <>
                            <Button onClick={() => modelStore.openModel(<Login />)} size="huge" inverted>Login</Button>
                            <Button onClick={() => modelStore.openModel(<Register/>)} size="huge" inverted>Register</Button>
                    </>
                )}
                
            </Container>
        </Segment>
  );
}

export default observer(HomePage);