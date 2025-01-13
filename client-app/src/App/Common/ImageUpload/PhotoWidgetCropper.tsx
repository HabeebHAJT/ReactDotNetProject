import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.min.css";

interface Props {
    previewImage:string
    setCropper: (cropper:Cropper) => void
}

function PhotoWidgetCropper({ previewImage, setCropper }: Props) {
  return (
      <Cropper
          src={previewImage}
          style={{ height: 200, width: '100%' }}
          initialAspectRatio={1}
          aspectRatio={1}
          preview=".img-preview"
          guides={false}
          viewMode={1}
          autoCropArea={1}
          background={false}
          onInitialized={(cropper) => setCropper(cropper) }

      ></Cropper>
  );
}

export default PhotoWidgetCropper;