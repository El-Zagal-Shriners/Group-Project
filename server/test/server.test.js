let app = require("../server");
let testServer = require("supertest");

describe("Test the root path", () => {
  test("Should receive 200 on logout", async () => {
    const response = await testServer(app).post("/api/user/logout");
    expect(response.statusCode).toBe(200);
  });

  test("Test if user is protected against unauthenticated", async () => {
    const response = await testServer(app).get("/api/user");
    expect(response.statusCode).toBe(403);
  });

  test("Test if returning info when authenticated", async () => {
    let agent = testServer.agent(app);
    const response = await agent
      .post("/api/user/login")
      .send({ username: "admin", password: "1234" });
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get("/api/user");
    expect(userResponse.statusCode).toBe(200);
    userResponse && console.log("received userResponse");
  });
});
