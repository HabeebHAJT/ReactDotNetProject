import { useStore } from "../../../App/Store/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Header } from "semantic-ui-react";
import { Fragment } from "react/jsx-runtime";



function ActivityListItems() {

    const { activityStore } = useStore();
    const { getGroupActivities } = activityStore;







    return (
        <>
            {getGroupActivities.map(([group, activitylist]) => {
               /* console.log("group : " + group); // Corrected placement*/

                return ( // Ensure you return JSX from the map function
                    <Fragment key={group}>
                        <Header sub color="teal">
                            {group}
                        </Header>

                       
                                {activitylist.map(activity => (
                                    <ActivityListItem key={activity.id} activity={activity} />
                                ))}
                         
                    </Fragment>
                );
            })}
        </>


    );
}

export default observer(ActivityListItems);