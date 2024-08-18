
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    handleFormOpen: () => void;
}

function NavBar({ handleFormOpen }: Props) {
    return (
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item header>
                    <img src='/Assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    ReactActivities
                </Menu.Item>
                <Menu.Item name="Activities" /> 
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => handleFormOpen()} ></Button>
                </Menu.Item> 
            </Container>
        </Menu>
  );
}

export default NavBar;