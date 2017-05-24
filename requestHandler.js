var UUID = require('node-uuid')




var commandProducer = require('./config/producer').getProducerForTopic("command");
var consumer = require('./config/consumer');



var reqCatche =  {};

function handleCommandRequestfunction (req, res, next) {
    
	var data = req.body;
	data._id  = UUID.v4();
	reqCatche[data._id]  = res ;
	commandProducer.write(new Buffer(JSON.stringify(data)));
}

consumer.subscribeToTopic("customer" ,function(data){
		var dataP = JSON.parse(data.toString());
		console.log(dataP);
		reqCatche[dataP._id].send(dataP);
		
})


module.exports = {
	handleCommandRequestfunction : handleCommandRequestfunction 
}
