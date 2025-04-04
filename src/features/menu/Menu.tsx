import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

interface PizzaMenuItem {
  id: number;
  name: string;
}

function Menu() {
  const menu = useLoaderData() as PizzaMenuItem[];
  
  return (
    <h1>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </h1>
  );
}

export async function loader() {
  const menu: PizzaMenuItem[] = await getMenu();
  return menu;
}

export default Menu;
