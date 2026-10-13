import assert from "node:assert/strict";
import { test, mock, afterEach } from "node:test";
import Note from "../src/models/Note.js";
import Session from "../src/models/Session.js";
import { requireAuth } from "../src/middleware/auth.js";
import { createNotes, getAllNotes, getNoteById, updateNotes, deleteNotes } from "../src/controlles/NotesControllers.js";

afterEach(() => mock.restoreAll());

function response() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

const request = () => ({
  user: { _id: "user-a" },
  params: { id: "note-b" },
  body: { title: "Title", content: "Content", user: "user-b" },
});

test("list only queries the authenticated user's notes", async () => {
  mock.method(Note, "find", (filter) => {
    assert.deepEqual(filter, { user: "user-a" });
    return { sort: async () => [] };
  });
  const res = response();
  await getAllNotes(request(), res);
  assert.deepEqual(res.body, []);
});

test("creation ignores a supplied owner", async () => {
  mock.method(Note, "create", async (fields) => {
    assert.deepEqual(fields, { title: "Title", content: "Content", user: "user-a" });
    return fields;
  });
  const res = response();
  await createNotes(request(), res);
  assert.equal(res.statusCode, 201);
});

for (const [controller, method] of [
  [getNoteById, "findOne"],
  [updateNotes, "findOneAndUpdate"],
  [deleteNotes, "findOneAndDelete"],
]) {
  test(`${controller.name} scopes access and returns 404 for another user's note`, async () => {
    mock.method(Note, method, async (filter, fields) => {
      assert.deepEqual(filter, { _id: "note-b", user: "user-a" });
      if (fields) assert.deepEqual(fields, { title: "Title", content: "Content" });
      return null;
    });
    const res = response();
    await controller(request(), res);
    assert.equal(res.statusCode, 404);
  });
}

test("invalid note fields are rejected before writing", async () => {
  const req = request();
  req.body.title = { $ne: "" };
  const res = response();
  await createNotes(req, res);
  assert.equal(res.statusCode, 400);
});

test("missing credentials are rejected", async () => {
  const res = response();
  await requireAuth({ get: () => undefined }, res, () => assert.fail("unauthorized"));
  assert.equal(res.statusCode, 401);
});

test("expired or unknown sessions are rejected", async () => {
  mock.method(Session, "findOne", (filter) => {
    assert.ok(filter.expiresAt.$gt instanceof Date);
    assert.equal(filter.tokenHash.length, 64);
    return { populate: async () => null };
  });
  const res = response();
  await requireAuth({ get: () => `Bearer ${"a".repeat(64)}` }, res, () => assert.fail("unauthorized"));
  assert.equal(res.statusCode, 401);
});
