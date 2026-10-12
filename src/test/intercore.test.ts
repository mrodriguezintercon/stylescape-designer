import { describe, it, expect } from "vitest";
import {
  authorizedModules,
  canAccessModule,
  parseStyle,
  searchValidator,
  prototypeVisible,
} from "@/data/intercore";
describe("Intercore prototype rules", () => {
  it("keeps all three requested URL styles", () => {
    expect(["corporate", "command", "portal"].map((style) => parseStyle(style, true))).toEqual([
      "corporate",
      "command",
      "portal",
    ]);
    expect(parseStyle("invalid")).toBe("corporate");
  });
  it("uses Corporate Workspace outside development even with legacy URL styles", () => {
    expect(parseStyle("command", false)).toBe("corporate");
    expect(parseStyle("portal", false)).toBe("corporate");
    expect(parseStyle("corporate", false)).toBe("corporate");
  });
  it("shows the prototype selector only in development", () => {
    expect(prototypeVisible(true)).toBe(true);
    expect(prototypeVisible(false)).toBe(false);
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
