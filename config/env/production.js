
module.exports = {


	db: "mongodb://localhost/fretron",
	serverURL: process.env.ABSOLUTEURL ? "" : "localhost:3000",
	pollingTimeLimit: 30, //in minutes
	maxCancelTime: 20,//in minutes
	maxDistance: 1.5, // in miles
	s3: {
		accessKeyId: "AKIAJZ35UIGUD6XWLU4A",
		secretAccessKey: "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",
		Bucket: 'mybuck'
	}
};
