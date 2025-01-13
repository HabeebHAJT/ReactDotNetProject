import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props{
    setFile: (file:any) => void
}

function PhotoWidgetDropZone({ setFile }: Props) {

    const dzstyle = {
        border: "dashed 3px lightgray",
        borderColor: "lightgray",
        borderradius: "5px",
        paddingTop: "30px",
        textAlign: "center" as "center",
        height: 200

    };

    const dzactive = {
        borderColor: "green",
        

    };


    const onDrop = useCallback((acceptedFiles:any) => {
        setFile(acceptedFiles
            .map((file: any) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })

             )
               )
        
    }, [setFile])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive?{...dzstyle ,...dzactive }:dzstyle }>
            <input {...getInputProps()} />
            <Icon name="upload" size="huge" />
            <Header content="Drop image here" />
        </div>
    )
}

export default PhotoWidgetDropZone;