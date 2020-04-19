const express = require('express');

const router = express.Router();
const passport = require('passport');

const Language = require('../../modules/Language');

// @ROUTE   DELETE api/languages/:lang_id,
// @DESC    Delete existing language
// @ACCESS  Private
router.delete(
  '/:lang_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Language.findByIdAndDelete(req.params.lang_id, (err, lang) => {
      if (err) {
        res.send(err);
      }
      if (!lang) {
        res.status(404).json({ success: false, error: 'Language not found' });
      }

      res.status(200).json({ success: true, item: lang._doc });
    });
    // .then(() => res.status(200).json({ success: true })).catch(err => res.send(err))
  }
);

// @ROUTE   PUT api/languages/:lang_id,
// @DESC    Update existing language
// @ACCESS  Private
router.put(
  '/:lang_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Language.findById(req.params.lang_id, (err, lang) => {
      if (err) {
        res.send(err);
      }
      if (lang) {
        lang.name = req.body.name;

        lang.save((err) => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Language updated' });
        });
      }
    });
  }
);

// @ROUTE GET api/languages
// @DESC get all languages
// @ACCESS Private
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Language.find(null, 'name createdAt')
      .sort('name')
      .then((languages) => {
        if (!languages) {
          const errors = {
            nolanguages: 'There are no languages',
          };
          return res.status(404).json(errors);
        }

        res.status(200).json(languages);
      })
      .catch((err) => {
        res.status(404).json({
          noposts: 'Cannot get languages',
        });
      });
  }
);

// @route POST api/languages
// @desc add new languages
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    // get post fields
    const newLang = new Language({
      name: req.body.name,
    });

    newLang.save().then((language) => res.json(language));
  }
);
module.exports = router;
