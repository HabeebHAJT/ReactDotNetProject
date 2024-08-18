import { duck } from "./demo";

interface duckitem {
    duck: duck
}


function DuckItem({duck}: duckitem) {
  return (
      <div key={duck.name}>
          <span>{duck.name}</span>
          <button onClick={() => duck.makeSound(duck.name + " makes sound quack")}> click</button>
      </div>
  );
}

export default DuckItem;