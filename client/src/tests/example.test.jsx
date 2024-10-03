import { describe, it, expect, test } from "vitest";

describe("Example test", () => {
    it("should work", () => {
        const sum = (a,b) => a+b;
        expect(sum(1,2)).toBe(3);
    });
});