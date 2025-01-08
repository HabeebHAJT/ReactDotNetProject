
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../Store/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";




function NavBar() {

    const { userStore } = useStore();
    const { user, logout } = userStore;


    return (
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item as={NavLink} to="/" header>
                    <img src='/Assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    ReactActivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activities" /> 
                <Menu.Item as={NavLink} to="/errors" name="Errors" /> 
                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" positive content="Create Activity" ></Button>
                </Menu.Item> 

                <Menu.Item position="right">
                    <Image src={user?.image || "/Assets/user.png"} avatar spaced="right" />
                    <Dropdown pointing="top left" text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My Profile" icon="user" />
                            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

            </Container>
        </Menu>
  );
}

export default observer(NavBar);