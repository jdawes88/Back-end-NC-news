process.env.NODE_ENV = 'test';
const {DB_URL} = require('../config/index')
const app = require('../app');
const mongoose = require('mongoose');
const request = require('supertest')(app);
const {expect} = require('chai');
const {seedDB} = require('../seed/seed');
const {articlesData, topicsData, usersData} = require('../seed/devData/index');
const faker = require('faker');
const {sample} = require('lodash')


describe('/', () => {
    let topics, users, articles, comments;
    beforeEach(function () {
        this.timeout(10000)
        return seedDB()
        .then(([topicsDoc, usersDoc, articlesDoc, commentsDoc]) => {
            topics = topicsDoc;
            users = usersDoc;
            articles = articlesDoc;
            comments = commentsDoc;
            // [topics, users, articles, comments] = data
        })
    })
    after(()=> {
        return mongoose.disconnect()
    })
    describe('/api/topics', () => {
        it('GET /topics', () => {
            return request
            .get('/api/topics')
            .expect(200)
            .then(result => {
                expect(result.body.topics).to.be.an('array');
                expect(result.body.topics[0].title).to.equal('Mitch')
            })
        })
        it('GET /topics/:topic_id/articles', () => {
            return request
            .get(`/api/topics/${topics[0]._id}/articles`)
            .expect(200)
            .then(result => {
                expect(result.body.articles).to.be.an('array');
                expect(result.body.articles[1].body).to.equal("Who are we kidding, there is only one, and it's Mitch!")
            })
        })
    describe('/api/articles', () => {
        it('GET /articles', () => {
            return request
            .get('/api/articles')
            .expect(200)
            .then(result => {
                expect(result.body.articles).to.be.an('array');
                expect(result.body.articles[0].title).to.equal('Living in the shadow of a great man')
            })
        })
        it('GET /articles/:article_id/comments', () => {
            return request
            .get(`/api/articles/${articles[1]._id}/comments`)
            .expect(200)
            .then(result => {
                expect(result.body.comments).to.be.an('array')
                expect(result.body.comments[0].belongs_to).to.equal(`${articles[1]._id}`)
            })
        })
        it('POST /api/articles/:article_id/comments', () => {
            const newComment = {
                "body": "test",
                "created_by": sample(users)._id
            }
            return request
            .post(`/api/articles/${articles[0]._id}/comments`)
            .send(newComment)
            .expect(201)
            .then(result => {
                expect(result.body).to.be.an('object');
                expect(result.body.comment.body).to.equal(newComment.body);
                expect(result.body.comment.belongs_to).to.equal(`${articles[0]._id}`)
            })
        })
        it('PUT /api/articles/:article_id?vote=up', () => {
            return request
            .put(`/api/articles/${articles[0]._id}?vote=up`)
            .expect(200)
            .then(result => {
                expect(result.body.article.votes).to.equal(1)
            })
        })
        it('PUT /api/articles/:article_id?vote=down', () => {
            return request
            .put(`/api/articles/${articles[0]._id}?vote=down`)
            .expect(200)
            .then(result => {
                expect(result.body.article.votes).to.equal(-1)
            })
        })
    describe('/api/comments', () => {
        it('PUT /api/comments/:comment_id?vote=up', () => {
            const votes = comments[0].votes
            return request
            .put(`/api/comments/${comments[0]._id}?vote=up`)
            .expect(200)
            .then(result => {
                expect(result.body.comment.votes).to.equal(votes + 1)
            })
        })
        it('PUT /api/comments/:comment_id?vote=down', () => {
            const votes = comments[0].votes
            return request
            .put(`/api/comments/${comments[0]._id}?vote=down`)
            .expect(200)
            .then(result => {
                expect(result.body.comment.votes).to.equal(votes - 1)
            })
        })
        it('DELETE /api/comments/:comment_id', () => {
            return request
            .delete(`/api/comments/${comments[0]._id}`)
            .expect(200)
            .then(result => {
                expect(result.body.newComments.length).to.equal(comments.length-1)
            })
        })
    describe('/api/users', () => {
        it(`GET /api/users/:user_id`, () => {
            return request
            .get(`/api/users/${users[0]._id}`)
            .expect(200)
            .then(result => {
                expect(result.body.user.username).to.equal('butter_bridge')
            })
        })
    })
    })
    })
    })
})
