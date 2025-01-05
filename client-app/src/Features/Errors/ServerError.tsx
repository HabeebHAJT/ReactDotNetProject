import { Container, Header, Segment } from "semantic-ui-react";
import { store } from "../../App/Store/store";




function ServerError() {
    return (
        <Container>
            <Header as="h1" content="Server Error"></Header>
            <Header as="h2" content={store?.commonStoere?.error?.message}></Header>
            {
        store?.commonStoere?.error?.details && (
                <Segment>
                    <Header as="h4" content="Server Error" color="teal"></Header>
                    <code style={{ marginTop: '10px' }}>{store?.commonStoere?.error?.details}</code>
                </Segment>
            )}

      </Container>
  );
}

export default ServerError;