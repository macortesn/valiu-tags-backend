import request from "supertest";
import { expect } from "chai";
import Tag from "../src/models/tag_model";
import app from "../src/server";
import database from "../src/database";

describe("CRUD tags", () => {

    before(done => {
        database.connect()
            .then(async () => {
                await database.drop()
                done()
            })
            .catch(err => {
                done(err)
            });
    })

    after(done => {
        database.close()
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            });
    })

    it("GET /tags, should have no tags", done => {
        request(app)
            .get("/api/tags")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body)
                    .to.be.an("object")
                    .that.has.all.keys("status", "message", "data")
                expect(res.body.data.length).to.equal(0)
                done();
            });
    });

    it("POST /tags, should create a tag", done => {
        request(app)
            .post("/api/tags")
            .send({
                "title": "Confirmado",
                "color": "#f0b345"
            })
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body)
                    .to.be.an("object")
                    .that.has.all.keys("status", "message", "data")
                expect(res.body.message).to.be.eql("Tag created")
                expect(res.body.data)
                    .to.be.an("object")
                    .that.has.all.keys("_id", "title", "color", "created_at", "updated_at", "__v")
                done();
            });
    });

    it("POST /tags, should try to create a tag but instead shows error", done => {
        request(app)
            .post("/api/tags")
            .send({
                "title": "",
                "color": "#f0b345"
            })
            .expect(400)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body)
                    .to.be.an("object")
                    .that.has.all.keys("status", "message", "data")
                expect(res.body.message).to.be.eql("Tag validation failed: title: Path `title` is required.")
                expect(res.body.data).to.be.eql(null)
                done();
            });
    });


    it("PUT /tags, should update a tag", done => {
        let newTag = new Tag({ title: "Update", color: "#EEE" })
        newTag.save((err, tag) => {
            request(app)
                .put(`/api/tags/${tag._id}`)
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body)
                        .to.be.an("object")
                        .that.has.all.keys("status", "message", "data")
                    expect(res.body.message).to.be.eql("Tag updated")
                    expect(res.body.data)
                        .to.be.an("object")
                        .that.has.all.keys("_id", "title", "color", "created_at", "updated_at", "__v")
                    done();
                });
        })
    });

    it("PUT /tags, should try to update a tag but instead shows error", done => {
        request(app)
            .put(`/api/tags/FAKE_ID`)
            .send({
                "title": "",
                "color": "#f0b345"
            })
            .expect(400)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body)
                    .to.be.an("object")
                    .that.has.all.keys("status", "message", "data")
                expect(res.body.message).to.be.eql(`Cast to ObjectId failed for value \"FAKE_ID\" at path \"_id\" for model \"Tag\"`)
                expect(res.body.data).to.be.eql(null)
                done();
            });
    });

    it("DELETE /tags, should delete a tag", done => {
        let newTag = new Tag({ title: "Delete", color: "#EEE" })
        newTag.save((err, tag) => {
            request(app)
                .delete(`/api/tags/${tag._id}`)
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body)
                        .to.be.an("object")
                        .that.has.all.keys("status", "message", "data")
                    expect(res.body.message).to.be.eql("Tag deleted")
                    expect(res.body.data)
                        .to.be.an("object")
                        .that.has.all.keys("_id", "title", "color", "created_at", "updated_at", "__v")
                    done();
                });
        });
    });

    it("DELETE /tags, should try to delete a tag but instead shows error", done => {
        let newTag = new Tag({ title: "Second tag", color: "#EEE" });
        newTag.save((err, tag) => {
            request(app)
                .put(`/api/tags/FAKE_ID`)
                .send({
                    "title": "",
                    "color": "#f0b345"
                })
                .expect(400)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body)
                        .to.be.an("object")
                        .that.has.all.keys("status", "message", "data")
                    expect(res.body.message).to.be.eql(`Cast to ObjectId failed for value \"FAKE_ID\" at path \"_id\" for model \"Tag\"`)
                    expect(res.body.data).to.be.eql(null)
                    done();
                });
        });
    });

    it("GET /tags, should get three tags", done => {
        request(app)
            .get("/api/tags")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body)
                    .to.be.an("object")
                    .that.has.all.keys("status", "message", "data");
                expect(res.body.data.length).to.be.eql(3);
                done();
            });
    });

});
