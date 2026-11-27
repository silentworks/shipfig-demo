import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { paginate } from "../src/index.ts";

const letters = ["a", "b", "c", "d", "e"];

describe("paginate", () => {
  it("returns the first page", () => {
    const page = paginate(letters, 1, 2);
    assert.deepEqual(page.items, ["a", "b"]);
    assert.equal(page.totalItems, 5);
    assert.equal(page.totalPages, 3);
    assert.equal(page.hasPrevious, false);
    assert.equal(page.hasNext, true);
  });

  it("returns a middle page", () => {
    const page = paginate(letters, 2, 2);
    assert.deepEqual(page.items, ["c", "d"]);
    assert.equal(page.hasPrevious, true);
    assert.equal(page.hasNext, true);
  });

  it("returns the last page without a next page", () => {
    const page = paginate(letters, 3, 2);
    assert.deepEqual(page.items, ["e"]);
    assert.equal(page.totalPages, 3);
    assert.equal(page.hasNext, false);
  });

  it("returns no items or next page past the end", () => {
    const page = paginate(letters, 4, 2);
    assert.deepEqual(page.items, []);
    assert.equal(page.hasNext, false);
  });

  it("treats an empty list as one empty page", () => {
    const page = paginate([], 1, 10);
    assert.deepEqual(page.items, []);
    assert.equal(page.totalPages, 1);
  });

  it("rejects invalid arguments", () => {
    assert.throws(() => paginate(letters, 0, 2), RangeError);
    assert.throws(() => paginate(letters, 1, 0), RangeError);
    assert.throws(() => paginate(letters, 1.5, 2), RangeError);
  });
});
