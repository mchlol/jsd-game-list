const axios = require('axios');

exports.handler = async function (event, context) {
    console.log('event:',event);
    console.log('context',context);
    try {
        // const { games } = event.queryStringParameters;
        const response = await axios.get(`https://rawg.io/api/games?token&key=${process.env.REACT_APP_API_KEY}`);
        return {
            statusCode: 200,
            body: JSON.stringify({response: response.data.results}),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: err.toString(),
        };
    }
};