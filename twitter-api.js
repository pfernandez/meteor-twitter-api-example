if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    var Twit = Meteor.npmRequire('twit');

		// "api" should be an object containing Twitter access keys, i.e.
		//	api = {
		//		consumer_key:         'YOUR_API_KEY',
		//		consumer_secret:      'YOUR_API_SECRET',
		//		access_token:         'YOUR_ACCESS_TOKEN', 
		//		access_token_secret:  'YOUR_TOKEN_SECRET'
		//	}
		
    var T = new Twit(api);

    //  search twitter for all tweets containing the word 'banana'
    //  since Nov. 11, 2011
    T.get('search/tweets',
        {
            q: 'banana since:2011-11-11',
            count: 100
        },
        function(err, data, response) {
            if(! err && 200 == response.statusCode) {
                console.log(data);
            }
        }
    );

  });
}
