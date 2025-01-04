
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/Assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                <Header content="Welcome to react activities" inverted as="h2" />
                <Button as={Link} to="/activities" size="huge" inverted>Take Me To Activities</Button>
            </Container>
        </Segment>
  );
}

export default HomePage;