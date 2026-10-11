import { describe, it, expect } from "vitest";
import {
  authorizedModules,
  canAccessModule,
  parseStyle,
  prototypeVisible,
  searchValidator,
} from "@/data/intercore";
describe("Intercore prototype rules", () => {
  it("keeps all three requested URL styles", () => {
    expect(["corporate", "command", "portal"].map(parseStyle)).toEqual([
      "corporate",
      "command",
      "portal",
    ]);
    expect(parseStyle("invalid")).toBe("corporate");
  });
  it("hides prototype controls in production", () => {
    expect(prototypeVisible(true)).toBe(false);
    expect(prototypeVisible(false)).toBe(true);
  });
  it("shows only authorized modules", () => {
    expect(authorizedModules().some((m) => m.id === "finanzas")).toBe(false);
    expect(authorizedModules()).toHaveLength(6);
  });
  it("blocks unauthorized and disabled module access", () => {
    expect(canAccessModule("finanzas")).toBe(false);
    expect(canAccessModule("proyectos")).toBe(false);
    expect(canAccessModule("cotizador")).toBe(true);
  });
  it("validates simulated state independently of style", () => {
    expect(searchValidator({ style: "portal", state: "expired" })).toEqual({
      style: "portal",
      state: "expired",
    });
  });
});
