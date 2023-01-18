import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("confirm if scoops are displaying correctly", async () => {
  render(<Options optionType="scoops" />);

  const optionItems = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(optionItems).toHaveLength(2);

  const altText = optionItems.map((item) => item.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("confirm if toppings are displaying correctly", async () => {
  render(<Options optionType="toppings" />);

  const toppings = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppings).toHaveLength(3);

  const altText = toppings.map((item) => item.alt);
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Cherries topping",
  ]);
});
