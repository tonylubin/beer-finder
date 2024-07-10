import { afterEach, beforeEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { resetIntersectionMocking, setupIntersectionMocking } from "react-intersection-observer/test-utils";

expect.extend(matchers);

// mocking router
beforeEach(() => {
  vi.mock("next/navigation", () => {
    return {
      useSearchParams: vi.fn(() => ({
        has: vi.fn().mockReturnValue({ name: "" }),
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });

  vi.mock("next-nprogress-bar", () => {
    return {
      useRouter: vi.fn(() => ({
        push: vi.fn(),
      })),
    };
  });

  setupIntersectionMocking(vi.fn);
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  resetIntersectionMocking();
  cleanup();
});
