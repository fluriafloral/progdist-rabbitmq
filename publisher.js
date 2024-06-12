import { amqp } from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (error, connection) => {
    // Connection Error Handling
    if (error) { 
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
                    direct: message goes to queue that matches routing key
                    topic: message goes to queues that matches routing key pattern
                    headers: uses header attributes for routing
                    fanout: broadcasts message to all queues it knows

                -options : 
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
        channel.publish(exchange, '', Buffer.from('test message'));
    });
});