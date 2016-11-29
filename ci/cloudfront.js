  var AWS = require('aws-sdk');
  var config = require('./config');
  var uuid = require('uuid');
  
  var createInvalidation = function(credentials, distribution_id, invalidationPath, callback) {
    AWS.config.update({
      region: 'us-west-2',
      maxRetries: 0
    });
    AWS.config.update(credentials);
    var cloudfront_client = new AWS.CloudFront();

    var callerRef = uuid.v4();

    var params = {
      DistributionId: distribution_id,
      InvalidationBatch: {
        CallerReference: callerRef,
        Paths: {
          Quantity: 1,
          Items: [
            invalidationPath
          ]
        }
      }
    };

    cloudfront_client.createInvalidation(params, function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(false, data);
      }
    });

  };


  var invalidate = function(env, callback) {
    var cfConfig = config.cloudfront[env];

    createInvalidation(cfConfig.credentials, cfConfig.distribution_id, cfConfig.invalidationPath, function(err, data) {
    	callback(false);
    });
  };



  module.exports = {
    invalidate: invalidate
  };
