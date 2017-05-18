import express from 'express';
import validate from 'express-validation';
// import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
// import config from '../../config/config';


const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

router.route('/token')
  .all(authCtrl.getToken);

router.route('/authorize')
  .get(authCtrl.getAuthorize)
  .post(authCtrl.postAuthorize);

/** POST /api/auth/salt - Returns password salt if correct username is provided */
router.route('/salt')
  .get(validate(paramValidation.salt), authCtrl.getSalt);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(authCtrl.authenticate(), authCtrl.getRandomNumber);

export default router;
