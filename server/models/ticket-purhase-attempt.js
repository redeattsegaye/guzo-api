'use strict';

module.exports = function(TicketPurhaseAttempt) {


  TicketPurhaseAttempt.beforeRemote('fetchTicketPurchaseAttempts', function(context, user, next) {
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

  TicketPurhaseAttempt.fetchTicketPurchaseAttempts = function(userId, callback) {
    TicketPurhaseAttempt.find({
      where: {
        userId
      }
    }, (err, TicketPurhaseAttempts) => {
      if (err) {
        callback(err);
      } else {
        callback(null, TicketPurhaseAttempts);
      }
    });
  };
};
