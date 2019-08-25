'use strict';

module.exports = function(Bus) {
  Bus.beforeRemote('fetchBuses', function(context, user, next) {
    // context.args.data.date = Date.now();
    // tags = context.req.body.tags
    // ingredients = context.req.body.ingredients
    // steps = context.req.body.steps
    
    if (context.req.accessToken) {
      context.args.userId = context.req.accessToken.userId;
      next();
    }
    else {
      next(new Error("You must be logged in as BusOwner to proceed."));
    }

  });

  Bus.fetchBuses = function(userId, callback) {
    Bus.find({
      where: {
        userId
      },
      include: ["seats"]
    }, (err, buses) => {
      if (err) {
        callback(err);
      } else {
        callback(null, buses);
      }
    });
  };





    Bus.beforeRemote('insertBus', function(context, user, next) {
    // context.args.data.date = Date.now();
    // tags = context.req.body.tags
    // ingredients = context.req.body.ingredients
    // steps = context.req.body.steps
    
    if (context.req.accessToken) {
      context.args.userId = context.req.accessToken.userId;
      next();
    }
    else {
      next(new Error("You must be logged in as BusOwner to proceed."));
    }

  });

  Bus.insertBus = function(newBusInstance, userId, callback) {
    Bus.create({
      ...newBusInstance,
      userId
    }, (err, buses) => {
      if (err) {
        callback(err);
      } else {
        callback(null, buses);
      }
    });
  };
};
