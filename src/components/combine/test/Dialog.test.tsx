import { screen, render } from "@testing-library/react";
import { AlertDialogComp } from "../Dialog";
import { DialogProvider } from "@/components/alert-provider";
import type { ReactNode } from "react";

it("데이터와 함께 AlertDialogComp 컴포넌트를 렌더링", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DialogProvider
      defaultValue={{
        isOpen: true,
        content: "내용입니다.",
        setContent() {},
        openDialog() {},
        closeDialog() {},
      }}
    >
      {children}
    </DialogProvider>
  );

  render(<AlertDialogComp />, { wrapper });

  const confirmButton = screen.getByText("확인");
  const confirmContent = screen.getByText("내용입니다.");

  expect(confirmButton).toBeInTheDocument();
  expect(confirmContent).toBeInTheDocument();
});
