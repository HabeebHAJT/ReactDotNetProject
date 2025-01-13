import { Button, Grid, Header} from "semantic-ui-react";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props {
    uploadPhoto: (file:Blob) => void,
    loading: boolean

}

function PhotoUploadWidget({ loading,uploadPhoto }: Props) {

    const [file, setFile] = useState<any>([])
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {

            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }

    useEffect(() => {

        return () => {
            file.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [file])
   
    

  return (
      <Grid>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
              <Header sub content="Step-1 Add photo" color="teal" />
              <PhotoWidgetDropZone setFile={setFile} />
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={4}>
              <Header sub content="Step-2 Format photo" color="teal" />
              {file && file.length > 0 &&
                  (
                  <PhotoWidgetCropper setCropper={setCropper} previewImage={file[0].preview } />
                  )}

          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
              <Header sub content="Step-3 Preview & Upload" color="teal" />
              
              {file && file.length > 0 && (
                  <>
                      <div className="img-preview" style={{ minHeight: 200, overflow: "hidden" }}></div>
                      <Button.Group widths={2}>
                          <Button loading={loading} positive onClick={onCrop} icon="check" />
                          <Button disabled={loading } onClick={() => setFile([])} icon="close" />
                      </Button.Group>
                     
                  </>
              )}
          
          </Grid.Column>
          <Grid.Column width={1} />
      </Grid>
  );
}

export default PhotoUploadWidget;