import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header, Menu } from "semantic-ui-react";

function ActivityFilter() {
  return (
      <>
          <Menu vertical size="large" style={{ width: '100%',marginTop:'30px' }} >
              <Header icon="filter" attached color="teal" content="Filters"/>
                  <Menu.Item content="All Activities" />
                  <Menu.Item content="I'am Going" />
                  <Menu.Item content="I'am Hosting" />
             
          </Menu>
            <Header />
            <Calendar />
      </>
  );
}

export default ActivityFilter;