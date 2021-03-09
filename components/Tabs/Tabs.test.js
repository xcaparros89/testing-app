import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { Tabs } from "./Tabs";
import { useRouter } from "next/router";

jest.mock("next/router");
test("<Tabs /> matches snapshot", () => {
  useRouter.mockReturnValue({
    push: () => {},
  });
  const component = render(
    <Tabs initialTab={{ tab: "tab-3" }}>
      <div label="Tab 1">
        <h2>Title 1</h2>
        <p>Text 1</p>
      </div>
      <div label="Tab 2">
        <h2>Title 2</h2>
        <p>Text 2</p>
      </div>
      <div label="Tab 3">
        <h2>Title 3</h2>
        <p>Text 3</p>
      </div>
    </Tabs>
  );
  expect(component.container).toMatchSnapshot();
});
