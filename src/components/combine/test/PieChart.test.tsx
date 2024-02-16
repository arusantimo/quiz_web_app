import { screen, render } from "@testing-library/react";
import PieChart from "../PieChart";

it("데이터와 함께 PieChart 컴포넌트를 렌더링", () => {
  const testData = [
    { value: 30, label: "A", color: "red" },
    { value: 70, label: "B", color: "blue" },
  ];

  render(<PieChart data={testData} />);

  const sliceA = screen.getByText("A");
  const sliceB = screen.getByText("B");

  expect(sliceA).toBeInTheDocument();
  expect(sliceB).toBeInTheDocument();
});
