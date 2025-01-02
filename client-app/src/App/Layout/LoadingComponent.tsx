import { Dimmer,Loader } from "semantic-ui-react";


interface props {

    inverted?: boolean;
    content?:string

}
function LoadingComponent({ inverted = true,content="Loding..." }:props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={ content} />
        </Dimmer>
  );
}

export default LoadingComponent;