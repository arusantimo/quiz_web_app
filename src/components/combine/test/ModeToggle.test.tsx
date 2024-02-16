import { screen, render } from "@testing-library/react";
import { ModeToggle } from "../ModeToggle";
import userEvent from "@testing-library/user-event";

it("모달 토글 버튼 클릭 확인", () => {
  render(<ModeToggle />);

  const toggleButton = screen.getByText("Toggle theme");

  expect(toggleButton).toBeInTheDocument();

  userEvent.click(toggleButton);
});
