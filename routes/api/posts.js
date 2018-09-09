const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require('../../modules/Post');
const Profile = require('../../modules/Profile');

// Validation
const validatePostInput = require('../../validation/posts');

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc delete comment from a post
// @access Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    // get post
    Post.findById(req.params.post_id)
        .then(post => {
            // return res.json(post)
            // check if comment does exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length > 0) {
                // return res.json({
                //     test: 'testing1'
                // })
                // check if comment belongs to current logged user
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id.toString() && comment.user.toString() !== req.user.id).length > 0) {
                    return res.status(401).json({
                        unauthorized: 'User is unauthorized to delete this comment'
                    })
                }
                // return res.json({
                //     test: 'testing2'
                // })
                const removeIndex = post.comments
                    .map(comment => comment._id)
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);
                post.save()
                    .then(post => res.json(post))
                    .catch(() => res.json({
                        cannotsave: 'Cannot save this post'
                    }));
            } else {
                return res.status(404).json({
                    commentnotfound: 'Comment not found'
                })
            }
        })
        .catch(err => res.status(404).json(err))
});

// @route POST api/posts/comment/:post_id
// @desc add new comment for post
// @access Private
router.post('/comment/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    // validate input
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    // get post
    Post.findById(req.params.post_id).then(post => {
            // get post fields
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            post.save().then(() => res.json(post)).catch(() => res.json({
                cannotsavepost: 'Cannot save post'
            }));
        })
        .catch(() => res.status(404).json({
            cannotfindpost: 'Cannot find post by given id'
        }))
});

// @route POST api/posts/like/:post_id
// @desc Like and Unlike post
// @access Private
router.post('/like/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) { // this post is already liked by this user, thus unlike the post
                        const removeIndex = post.likes
                            .map(like => like.user.toString())
                            .indexOf(req.user.id);

                        //   splice out of array
                        post.likes.splice(removeIndex, 1);
                    } else {
                        post.likes.unshift({
                            user: req.user.id
                        });
                    }
                    post.save().then(post => res.json(post));

                })
                .catch(() => res.status(404).json({
                    error: 'Cannot find post'
                }))
        })
        .catch(() => res.status(404).json({
            profilenotfound: 'Cannot find profile'
        }));

});

// @route DELETE api/posts/:post_id
// @desc Delete post by id // only allowed to remove self posts
// @access Private
router.delete('/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'Not authorized to remove this post'
                        });
                    }

                    post.remove().then(() => res.json({
                        success: 'true'
                    })).catch(err => res.status(404).json({
                        error: 'Cannot remove post'
                    }))
                })
                .catch(() => res.status(404).json({
                    error: 'Cannot find post'
                }))
        })
        .catch(() => res.status(404).json({
            profilenotfound: 'Cannot find profile'
        }));

});

// @route GET api/posts/:post_id
// @desc get post by id
// @access Private
router.get('/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Post.findById(req.params.post_id)
        .then(post => {
            if (!post) {
                errors.nopost = 'There are no such post';
                return res.status(404).json(errors);
            }

            res.json(post);
        })
        .catch(err => {
            res.status(404).json({
                nopost: 'Cannot get such post'
            });
        })

});

// @route GET api/posts
// @desc get all posts
// @access Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Post.find()
        .sort({
            date: -1
        })
        .then(posts => {
            if (!posts) {
                errors.noposts = 'There are no posts';
                return res.status(404).json(errors);
            }

            res.json(posts);
        })
        .catch(err => {
            res.status(404).json({
                noposts: 'Cannot get posts'
            })
        })

});

// @route POST api/posts
// @desc add new post
// @access Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // get post fields
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post));

});

// @route GET api/posts/test
// @desc Tests posts route
// @access public
router.get('/test', (req, res) => res.json({
    msg: 'Testing posts routes'
}));

module.exports = router;