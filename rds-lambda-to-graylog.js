'use strict';

var http = require('http');
var zlib = require('zlib');
const dgram = require('dgram');

const grayLogConfiguration = {
    hostName: process.env.LOG_HOST,
    port: process.env.LOG_PORT
};

exports.handler = (event, context, callback) => {
    const payload = new Buffer.from(event.awslogs.data, 'base64');
    
    function parseEvent(logEvent, logGroupName, logStreamName) {
        return {
            // remove '\n' character at the end of the event
            message: logEvent.message.substring(0, logEvent.message.length),
            logGroupName,
            logStreamName,
            timestamp: new Date(logEvent.timestamp).toISOString(),
        };
    }

    
    function postUdpEventsToGrayLog(parsedEvents) {
        const finalEvent = parsedEvents.map(JSON.stringify).join('\n');
        var client = dgram.createSocket('udp4');
        client.send(finalEvent, grayLogConfiguration.port, grayLogConfiguration.hostName, function(error){
          if(error){
              callback(error);
          }
          client.close();
        });
    }
    
    zlib.gunzip(payload, (error, result) => {
        if (error) {
            callback(error);
        } else {
            const resultParsed = JSON.parse(result.toString('ascii'));
            const parsedEvents = resultParsed.logEvents.map((logEvent) =>
                    parseEvent(logEvent, resultParsed.logGroup, resultParsed.logStream));

            postUdpEventsToGrayLog(parsedEvents);
        }
    });
};
