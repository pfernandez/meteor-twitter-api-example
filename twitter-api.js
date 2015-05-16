Tweets = new Mongo.Collection('tweets');


if (Meteor.isClient) {

	Meteor.subscribe('tweets');
	
	Template.twitterData.helpers({
		rawData: function () {
			return JSON.stringify(Tweets.findOne(), null, 2);
		},
		data: function () {
			return Tweets.findOne();
		}
	});

}


if (Meteor.isServer) {
	Meteor.startup(function () {
		
		// If our collection is empty, grab some data and insert it.
		if(Tweets.find().count() < 1) { 

			var Twit = Meteor.npmRequire('twit');
			
			/*
			apiKeys = {
				consumer_key:         'YOUR_API_KEY',
				consumer_secret:      'YOUR_API_SECRET',
				access_token:         'YOUR_ACCESS_TOKEN', 
				access_token_secret:  'YOUR_TOKEN_SECRET'
			}
			*/

			var T = new Twit(apiKeys);
			T.get('search/tweets',
				{
					q: 'meteorjs',
					count: 10
				},
				Meteor.bindEnvironment(function(err, data, response) {
					if(! err && 200 == response.statusCode) {
						Tweets.insert(data);
					}
				})
			);
		}
		
		// Make the data available to the client.
		Meteor.publish('tweets', function () {
		  return Tweets.find();
		});
		
	});
}
