
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../Store/store";



function NavBar() {

    const { activityStore } = useStore();

    return (
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item header>
                    <img src='/Assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    ReactActivities
                </Menu.Item>
                <Menu.Item name="Activities" /> 
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activityStore.openForm()} ></Button>
                </Menu.Item> 
            </Container>
        </Menu>
  );
}

export default NavBar;