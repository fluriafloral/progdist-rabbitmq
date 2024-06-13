import { amqp } from 'amqplib/callback_api';

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

    connection.createChannel(function(channelError, channel) {
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
                    fanout: broadcasts message to all queues it knows

                -options: 
                    durable: exchange will survive if broker restarts
        */
        channel.assertExchange(exchange, 'fanout', {durable: true});

        /* 
            Creates a Queue

            Parameters:
                -queue: queue name (if empty, server creates a random name)

                -options:
                    exclusive: scopes queue to the connection
                    durable: queue survives broker restarts

                --function(err, q): function To Handle Error And Queue Handling
        */
        channel.assertQueue('', {exclusive: true, durable: true}, (queueError, q) => {
            // Queue Creation Error Handling
            if (queueError) {
                throw queueError;
            }

            /* 
                Creates a Routing Path From Exchange to Queue

                -queue: queue from subscriber

                -source: exchange from publisher

                -pattern: pattern to match from exchange 

            */
            channel.bindQueue(q.queue, exchange, '');

            /*
                Sets a Consumer with Callback Invoked With Messages

                -queue: queue from subscriber

                -function(msg): function to handle each message
            */
            channel.consume(q.queue, (msg) => { 
                //handles message
            });
        }

        );
    }
    );
}
);