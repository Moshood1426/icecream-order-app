import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("confirm if images are displaying correctly", async () => {
  render(<Options optionType="scoops" />);

  const optionItems = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(optionItems).toHaveLength(2);
  
  const altText = optionItems.map((item) => item.alt);
  console.log(altText)
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
