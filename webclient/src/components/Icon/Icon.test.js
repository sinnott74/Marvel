import React from "react";
import { shallow } from "enzyme";
import Icon from "./index";

describe("Icon", () => {
  it("renders without crashing", () => {
    shallow(<Icon alt="" src="" />);
  });

  it("can set alt", () => {
    const alt = "Icon test";
    const wrapper = shallow(<Icon alt={alt} img="" />);
    const img = wrapper.find("img");
    expect(img.prop("alt")).toBe(alt);
  });

  it("can set img", () => {
    const src = "/";
    const wrapper = shallow(<Icon alt="" img={src} />);
    const img = wrapper.find("img");
    expect(img.prop("src")).toBe(src);
  });
});
