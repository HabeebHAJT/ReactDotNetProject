import { Modal } from "semantic-ui-react";
import { useStore } from "../../Store/store";
import { observer } from "mobx-react-lite";

function MyModel() {

    const {modelStore } = useStore();

    return (
        <Modal open={modelStore.model.open} onClose={()=>modelStore.cloaseModel()}>
            <Modal.Content>{modelStore.model.body}</Modal.Content>
        </Modal>
  );
}

export default observer(MyModel);