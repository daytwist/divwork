import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

describe("SignIn", () => {
  test("スナップショット", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
