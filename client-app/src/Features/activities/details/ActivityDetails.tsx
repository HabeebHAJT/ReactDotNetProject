import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";



interface Props {

    activity: Activity;
    handleCanceledActivity: () => void;
    handleFormOpen: (id: string) => void;
}
function ActivityDetails({ activity, handleCanceledActivity,handleFormOpen }: Props) {
    return (
        <Card fluid>
          <Image src={`/Assets/categoryImages/${activity.category}.jpg`} />
          <CardContent>
              <CardHeader>{activity.title}</CardHeader>
              <CardMeta>
                  <span>{activity.date}</span>
              </CardMeta>
              <CardDescription>
                  {activity.description}
              </CardDescription>
          </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' onClick={()=>handleFormOpen(activity.id)} content='Edit' />
                    <Button basic color='grey' onClick={()=>handleCanceledActivity()} content='Cancel' />

              </Button.Group>
          </CardContent>
      </Card>
  );
}

export default ActivityDetails;