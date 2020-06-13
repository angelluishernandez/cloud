const mongoose = require("mongoose");

const User = require("../../../api/models/user.model");

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	});

	// Test root route

	describe("/GET test", () => {
		it("should test that api is working", (done) => {
			chai
				.request(server)
				.get("/")
				.end((err, res) => {
					should.not.exist(err);
					res.should.have.status(200);
					res.body.should.be.eql("Hello, the API is working");
					done();
				});
		});
	});

	// Get all users test

	describe("/GET users", () => {
		it("should return all the users in DB", (done) => {
			chai
				.request(server)
				.get("/users")
				.end((err, res) => {
					should.not.exist(err);
					res.should.have.status(202);
					res.body.should.be.a("string");
					res.body.should.be.eql("No users found");
					done();
				});
		});

		// it("should return 200 if users not found", done=>{
		// 	chai.request(server)
		// 	.get("/users")
		// 	.end((err, res) => {
		// 		should.not.exist(err)
		// 		res.should.have.status(200)
		// 		res.body.should.be.a("array")
		// 		res.body.length.should.be.eql
		// 	})
		// } )
	});

	// // Create user route

	describe("/POST user", () => {
		it("should not POST if no name is present in body", (done) => {
			let user = {
				email: "ewcxnjvbxjbvgwgww@a.com",
				birthdate: "2612dgdgdg1987",
				street: "Some street",
				state: "Some state",
				city: "Some city",
				country: "Some country",
				zip: "45AB",
			};
			chai
				.request(server)
				.post("/createUsers")
				.send(user)
				.end((err, res) => {
					res.should.have.status(405);
					res.body.should.be.a("string");
					res.body.should.be.eql("Invalid input");
					done();
				});
		});

		it("should POST the user to the database", (done) => {
			let user = {
				name: "Angel",
				email: "email@a.com",
				birthdate: "26121987",
				street: "Some street",
				state: "Some state",
				city: "Some city",
				country: "Some country",
				zip: "45AB",
			};
			chai
				.request(server)
				.post("/createUsers")
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a("string");
					res.body.should.be.eql("CREATED");

					done();
				});
		});
	});

	// Get one user by id

	describe("GET user", () => {
		it("should GET a user by user", (done) => {
			let user = new User({
				_id: 1,
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)
					.get(`/getusersById/${Number(user._id)}`)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("name");
						res.body.should.have.property("email");
						res.body.should.have.property("birthDate");
						res.body.should.have.property("address");
						res.body.should.have.property("_id").eql(user._id);

						done();
					});
			});
		});

		it("should return 400 if id is not a number", () => {
			let user = new User({
				_id: "A",
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)
					.get(`/getusersById/${Number(user._id)}`)
					.send(user)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a("object");
						res.body.should.be.eql("Invalid id");
					});
			});
		});

		it("should return 404 if user not found", () => {
			chai
				.request(server)
				.get(`/getusersById/${500}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a("object");
					res.body.should.be.eql("User not found");
				});
		});
	});

	// Update user

	describe("/PUT/:id user", () => {
		it("should return 400 if id is not a number", () => {
			let user = new User({
				_id: "A",
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)
					.put(`/updateUsersById/${Number(user._id)}`)
					.send(user)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a("object");
						res.body.should.be.eql("Invalid user id");
					});
			});
		});

		it("should return 404 if user not found", () => {
			chai
				.request(server)
				.put(`/getusersById/${500}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a("object");
					res.body.should.be.eql("User not found");
				});
		});

		it("it should UPDATE a user given the id", (done) => {
			const user = new User({
				_id: 1,
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street2",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)
					.put(`/updateUsersById/${Number(user._id)}`)
					.send({ ...user, name: "Luis" })
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("string");
						res.body.should.be.eql("OK");

						done();
					});
			});
		});
	});

	// Delete user

	describe("/DELETE/:id", () => {
		it("should return 400 is id is invalid ", () => {
			const user = new User({
				_id: "A",
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street2",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)
					.delete(`/deleteUserById/${user._id}`)
					.end((err, res) => {
						res.should.have.status(400);
						res.should.be.a("string");
						res.should.be.eql("Invalid user id");
						done();
					});
			});
		});

		it("should return 404 if user is not found", () => {
			chai
				.request(server)
				.delete(`/deleteUserById/${500}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a("string");
					res.body.should.be.eql("User not found");
				});
		});

		it("it should DELETE an user given an id", (done) => {
			const user = new User({
				_id: 1,
				name: "Angel",
				email: "email@a.com",
				birthDate: "26121987",
				address: {
					street: "Some street2",
					state: "Some state",
					city: "Some city",
					country: "Some country",
					zip: "45AB",
				},
			});

			user.save((err, user) => {
				chai
					.request(server)

					.delete(`/deleteUserById/${Number(user._id)}`)
					.end((err, res) => {
						res.should.have.status(202);
						res.body.should.be.a("string");
						res.body.should.be.equal("OK");
						done();
					});
			});
		});
	});
});
