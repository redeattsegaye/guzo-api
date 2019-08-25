"use strict";

module.exports = function(BusOwner) {
  /**
   * Fetches all available bus providers
   * @param {Function(Error)} callback
   */

  BusOwner.fetchBusProviders = function(callback) {
    // TODO
    BusOwner.find({}, (err, data) => {
      callback(data);
    });
  };
};
