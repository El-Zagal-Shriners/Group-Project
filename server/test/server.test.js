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
    const response = await agent.post("/api/user/login").send({
      username: process.env.MEMBER_TESTING_USERNAME,
      password: process.env.MEMBER_TESTING_PASSWORD,
    });
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get("/api/user");
    expect(userResponse.statusCode).toBe(200);
    userResponse && console.log("received User Info");
  });

  // test("Test register with correct object", async () => {
  //   const newUser = {
  //     username: "testing",
  //     first_name: "John",
  //     last_name: "Doe",
  //     email: "John.Doe@test.com",
  //     dues_paid: "01/01/2022",
  //     membership_number: "1234",
  //     password: "testpassword",
  //   };
  //   const response = await testServer(app)
  //     .post("/api/user/register")
  //     .send(newUser);
  //   expect(response.statusCode).toBe(201);
  // });

  test("Should receive 403 on get members without authorization/authentication", async () => {
    const response = await testServer(app).get("/api/accounts/");
    expect(response.statusCode).toBe(403);
  });

  test("Test if members return when authenticated and authorized", async () => {
    let agent = testServer.agent(app);
    const response = await agent.post("/api/user/login").send({
      username: process.env.ADMIN_TESTING_USERNAME,
      password: process.env.ADMIN_TESTING_PASSWORD,
    });
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get("/api/accounts/");
    expect(userResponse.statusCode).toBe(200);
    userResponse && console.log("received Member Info");
  });

  test("Test if members return when authenticated but not authorized", async () => {
    let agent = testServer.agent(app);
    const response = await agent.post("/api/user/login").send({
      username: process.env.MEMBER_TESTING_USERNAME,
      password: process.env.MEMBER_TESTING_PASSWORD,
    });
    expect(response.statusCode).toBe(200);

    const memberResponse = await agent.get("/api/accounts/");
    expect(memberResponse.statusCode).toBe(403);
    memberResponse && console.log("received Member Info");
  });
});
