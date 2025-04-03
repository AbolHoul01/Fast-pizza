const API_URL = "https://react-fast-pizza-api.onrender.com/api";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  imageUrl: string;
}

interface Order {
  id: number;
  customer: string;
  status: string;
  items: { pizzaId: number; quantity: number }[];
  totalPrice: number;
}

export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw new Error("Failed getting menu");

  const { data }: { data: MenuItem[] } = await res.json();
  return data;
}

export async function getOrder(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) throw new Error(`Couldn't find order #${id}`);

  const { data }: { data: Order } = await res.json();
  return data;
}

export async function createOrder(newOrder: Omit<Order, "id">): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed creating your order");

    const { data }: { data: Order } = await res.json();
    return data;
  } catch {
    throw new Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: number,
  updateObj: Partial<Order>
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed updating your order");
  } catch {
    throw new Error("Failed updating your order");
  }
}
