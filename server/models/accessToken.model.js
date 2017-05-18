import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

import createdPlugin from './plugins/created';
import APIError from '../helpers/APIError';

/**
 * Access Token Storage Schema
 */
const AccessTokenSchema = new mongoose.Schema({
  tokenType: {
    type: String,
    enum: ['access', 'refresh'],
    required: true,
    default: 'access'
  },
  entityId: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  scope: String,
  expiresAt: Date
});
AccessTokenSchema.plugin(createdPlugin);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AccessTokenSchema.method({
});

/**
 * Statics
 */
AccessTokenSchema.statics = {
  /**
   * Get access token by id.
   * @param {String} id - the id of the access token.
   * @returns {Promise<AccessToken, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((accessToken) => {
        if (accessToken) {
          return accessToken;
        }
        const err = new APIError('No such access token exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getByToken(token) {
    return this.find({ token })
      .exec()
      .then((accessToken) => {
        if (accessToken) {
          return accessToken;
        }
        const err = new APIError('No such access token exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getByEntityAndClient(entityId, clientId) {
    return this.find({ entityId, clientId })
      .exec()
      .then((accessToken) => {
        if (accessToken) {
          return accessToken;
        }
        const err = new APIError('No such access token exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Entity
 */
export default mongoose.model('AccessToken', AccessTokenSchema);
