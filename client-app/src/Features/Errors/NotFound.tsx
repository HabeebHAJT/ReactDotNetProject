import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Oops ! - We are looked eveywhere. but not found
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities" content="Return To Activty Page" />
            </Segment.Inline>
        </Segment>
  );
}

export default NotFound;