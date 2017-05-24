var Kafka = require('node-rdkafka'),
	config = require('./index');


function subscribeToTopic(topics, cb) {

	var stream = Kafka.KafkaConsumer.createReadStream(config.kafkaGlobalConsumerConfig, {}, {topics: topics,waitInterval: 0,objectMode: false});

	stream.on('data', function (data) {
		///console.log(data.toString().trim())
		cb(data);
	});

	stream.on('error', function (err) {
		console.log(err);
		process.exit(1);
	});

	stream.consumer.on('event.error', function (err) {
		console.log(err);
	})

}


module.exports = {
	subscribeToTopic  : subscribeToTopic 
}