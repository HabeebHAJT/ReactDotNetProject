import { Card, Header, Tab,Image, Grid, Button } from "semantic-ui-react";
import { Photo, Profile } from "../../App/Models/Profile";
import { observer } from "mobx-react-lite";
import { useStore } from "../../App/Store/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../App/Common/ImageUpload/PhotoUploadWidget";





interface Props {

    profile:Profile
}
function ProfilePhotos({ profile }: Props) {

   

    const { profileStore: { isCurrentUser, uploadPhoto, IsUploadingPhoto, isLoading, setMain, deletePhoto } } = useStore();
    const [addPhotoMode, setaddPhotoMode] = useState(false);
    const [target, settarget] = useState('');

    function uploadPhotoHandler(file: Blob) {
        uploadPhoto(file).then(() => setaddPhotoMode(false))
    }

    function handleSetMainPhoto(file: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        settarget(e.currentTarget.name);
        setMain(file);
    }
    function handleDeletePhoto(file: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        settarget(e.currentTarget.name);
        deletePhoto(file);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon="image" floated="left" content="Photos" />
                    {isCurrentUser && (
                        <Button floated="right"
                            content={addPhotoMode ? "Cancel" : "Add Photo"}
                            onClick={() => setaddPhotoMode(!addPhotoMode)}
                        />
                    )} 
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={uploadPhotoHandler} loading={IsUploadingPhoto} />
                    ) : (
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    basic
                                                    color="green"
                                                    disabled={photo.isMain}
                                                    name={"Main"+photo.id}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                    loading={(target == "Main" + photo.id) && isLoading}
                                                    content="Main"
                                                />
                                                <Button
                                                    basic
                                                    color="red"
                                                    disabled={photo.isMain}
                                                    name={photo.id}
                                                    onClick={e => handleDeletePhoto(photo, e)}
                                                    loading={(target == photo.id) && isLoading}
                                                    icon="trash"
                                                />

                                            </Button.Group>
                                        )}
                                    </Card>
                                ))}

                            </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
            
            

        </Tab.Pane>
  );
}

export default observer(ProfilePhotos);