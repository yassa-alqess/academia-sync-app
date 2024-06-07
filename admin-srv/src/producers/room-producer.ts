// import { CourseAddPayload } from '@/shared/interfaces';
// import KafkaNode from 'kafka-node';
// // import {
// // 	APPOINTMENT_NOTIFICATION_TYPE_ENUM,
// // 	ERROR_STATUS_CODE,
// // 	OK_STATUS_CODE,
// // } from '../utils/Constants.js';

// const client = new KafkaNode.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new KafkaNode.Producer(client);

// const roomProducer = (app) => {
//     const kafka_topic = 'notifications';

//     producer.on('ready', function () {
//         console.log('room producer is ready');
//     });

//     producer.on('error', function (err) {
//         console.log('room producer is in error state');
//         console.log(err);
//     });

//     const sendNotification = async (payload: CourseAddPayload) => {
//         const messagePayload = [
//             {
//                 topic: kafka_topic,
//                 messages: JSON.stringify({
//                     payload,
//                 }),
//             },
//         ];

//         producer.send(messagePayload, (err, data) => {
//             console.log('payloads = ', payload);
//             console.log('data = ', data);
//             if (err) {
//                 console.log(
//                     '[kafka-producer -> ' + kafka_topic + ']: broker update failed',
//                 );
//             } else {
//                 console.log(
//                     '[kafka-producer -> ' + kafka_topic + ']: broker update success',
//                 );
//             }
//         });
//     };





//     // app.post('/appointments/:userId', async (req, res) => {
//     //     try {
//     //         const userId = req.params.userId;
//     //         const appointment = req.body;
//     //         await sendAppointmentNotification(userId, appointment);
//     //         res.status(OK_STATUS_CODE).send();
//     //     } catch (err) {
//     //         console.log(err);
//     //         res.status(ERROR_STATUS_CODE).send();
//     //     }
//     // });
// };

// export default roomProducer;



import kafka from 'kafka-node';

const kafkaClientOptions = {
    kafkaHost: 'kafka:9092', // Adjust the Kafka broker address
};

const client = new kafka.KafkaClient(kafkaClientOptions);
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is ready');
});

producer.on('error', (err) => {
    console.error('Kafka Producer is in error state');
    console.error(err);
});
//eslint-disable-next-line
const sendMessage = async (topic: string, payload: any) => {
    const messagePayload = [
        {
            topic: topic,
            messages: JSON.stringify(payload),
        },
    ];

    producer.send(messagePayload, (err, data) => {
        if (err) {
            console.error('[kafka-producer -> ' + topic + ']: broker update failed');
        } else {
            console.log('[kafka-producer -> ' + topic + ']: broker update success', data);
        }
    });
};

export default {
    sendMessage,
};
