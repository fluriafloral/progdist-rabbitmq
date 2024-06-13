const amqp = require('amqplib/callback_api');

var url = 'amqp://localhost';

/*
    Connects To AMQP Server

    Parameters:
        -url: AMPQ 0-9-1 (Original Protocol Implemented By RabbitMQ) URL

        -function(err, connection): Function To Handle Error And Successful Connection
*/
amqp.connect(url, (connectionError, connection) => {
    // Connection Error Handling
    if (connectionError) { 
        throw error;
    }

    connection.createChannel((channelError, channel) => {
        // Channel Creation Error Handling
        if (channelError) {
            throw channelError;
        }

        // // Exchange Name Declaration
        var exchange = 'teste';

        /*
            Exchange Declaration

            Parameters: 
                -exchange : name of the exchange created

                -type: type of exchange (direct, topic, headers, fanout)
                    direct: message goes to queue that matches routing key
                    topic: message goes to queues that matches routing key pattern
                    headers: uses header attributes for routing
                    fanout: broadcasts message to all queues it knows

                -options: 
                    durable: exchange will survive if broker restarts
        */
        channel.assertExchange(exchange, 'fanout', {durable: true});

        /*  
            Publishes to Named Exchange

            Parameters:
                -exchange : name of the exchange

                -queue : specific queue to send 
                         (empty string if it's to send to all queues)

                -buffer : content of messages
        */
        let msg = 'test message';
        channel.publish(exchange, '', Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });

    // Closes connection after a defined time in milliseconds. 5000 = 5 seconds.
    let timeOpen = 5000;
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, timeOpen);
});