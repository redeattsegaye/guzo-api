'use strict';
const _ = require("lodash")

module.exports = function(Journey) {
  Journey.beforeRemote('fetchJournies', function(context, user, next) {
    // context.args.data.date = Date.now();
    // tags = context.req.body.tags
    // ingredients = context.req.body.ingredients
    // steps = context.req.body.steps
    
    if (context.req.accessToken) {
      context.args.userId = context.req.accessToken.userId;
      next();
    }
    else {
      next(new Error("You must be logged in as JourneyOwner to proceed."));
    }

  });

  Journey.fetchJournies = function(userId, callback) {
    Journey.find({
      where: {
        userId
      },
      include: [
        "sourceCity",
        "destinationCity",
        "tickets"
      ]
    }, (err, Journies) => {
      if (err) {
        callback(err);
      } else {
        callback(null, Journies);
      }
    });
  };



  Journey.searchJournies = function(sourceCityName, destinationCityName, callback) {
    Journey.find({
      include: [
        "sourceCity",
        "destinationCity",
        "tickets"
      ]
    }, (err, Journies) => {
      if (err) {
        callback(err);
      } else {
        Promise.all(
          Array.from(Journies).map(async x => {
            const sourceCity = await x.sourceCity.get()
            const destinationCity = await x.destinationCity.get()
            if (sourceCity != null && destinationCity != null)
              if(sourceCity.name == sourceCityName && destinationCity.name == destinationCityName)
                return x
            return false
          })
        ).then(newList => {
          callback(null, newList.filter(x => !!x));          
        })
      }
    });
  };


  Journey.fetchPopularDestinations = function(journeyDate, callback) {
    journeyDate = new Date(journeyDate);

    Journey.find({
      include: [
        "sourceCity",
        "destinationCity",
        "tickets"
      ],
      where: {
        journeyDate: {
          gt: new Date(new Date().setDate(journeyDate.getDate() - 1)),
          lt: new Date(new Date().setDate(journeyDate.getDate() + 1))
        }
      }
    }, (err, journies) => {
      if (err) {
        callback(err);
      } else {
        let result = _.groupBy(journies.map(x => JSON.parse(JSON.stringify(x))), (x) => x.sourceCity ? x.sourceCity.name : undefined);
        callback(null, result);
      }
    });
  };



    Journey.beforeRemote('insertJourney', function(context, user, next) {
    // context.args.data.date = Date.now();
    // tags = context.req.body.tags
    // ingredients = context.req.body.ingredients
    // steps = context.req.body.steps
    
    if (context.req.accessToken) {
      context.args.userId = context.req.accessToken.userId;
      next();
    }
    else {
      next(new Error("You must be logged in as JourneyOwner to proceed."));
    }

  });

  Journey.insertJourney = function(newJourneyInstance, userId, callback) {
    Journey.create({
      ...newJourneyInstance,
      userId
    }, (err, { id }) => {
      if (err) {
        callback(err);
      } else {
        callback(null, id);
      }
    });
  };
};
