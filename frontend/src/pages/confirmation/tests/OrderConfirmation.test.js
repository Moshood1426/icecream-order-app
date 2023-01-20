import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("order failed", async () => {
  render(<OrderConfirmation />);

  server.resetHandlers(
    rest.get("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const confirmationLoaded = await screen.findByText(
    "An unexpected error occurred.",
    {
      exact: false,
    }
  );
  expect(confirmationLoaded).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
});
