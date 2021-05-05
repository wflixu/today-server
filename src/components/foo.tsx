import { FunctionalComponent } from 'vue';

const FcNode: FunctionalComponent<{ name: string }> = ({ name }) => {
  return <div>{name}</div>;
};

export default FcNode;
