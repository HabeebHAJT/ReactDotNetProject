import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../App/Store/store";





function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, closeForm } = activityStore;

    return (
        <Card fluid>
          <Image src={`/Assets/categoryImages/${activity!.category}.jpg`} />
          <CardContent>
              <CardHeader>{activity!.title}</CardHeader>
              <CardMeta>
                  <span>{activity!.date}</span>
              </CardMeta>
              <CardDescription>
                  {activity!.description}
              </CardDescription>
          </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' onClick={() => openForm(activity?.id)} content='Edit' />
                    <Button basic color='grey' onClick={() => closeForm} content='Cancel' />

              </Button.Group>
          </CardContent>
      </Card>
  );
}

export default ActivityDetails;