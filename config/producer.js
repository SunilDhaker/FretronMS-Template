var Kafka = require('node-rdkafka');
var config = require('./index');

function getProducerForTopic(topicName) {

	var stream = Kafka.Producer.createWriteStream(config.kafkaGlobalProducerConfig, {}, {
			topic: topicName
	});

	stream.on('error', function (err) {
		console.error('Error in our kafka stream');
		console.error(err);
	})
	return stream;
}

module.exports = {
	getProducerForTopic : getProducerForTopic
}