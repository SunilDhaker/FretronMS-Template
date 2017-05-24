
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var customerProducer = require('./config/producer').getProducerForTopic("customer");
var consumer = require('./config/consumer');


consumer.subscribeToTopic("command" ,function(data){
	console.log(data.toString())
	var dataP = JSON.parse(data.toString());
	dataP.type = 'customer.created.event'
    customerProducer.write(new Buffer(JSON.stringify(dataP)));
})