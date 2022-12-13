import { Provider, Scope } from '@heronjs/common';
import { ProviderTokens } from '../../../../../../constants';
import { EachMessageHandler, Kafka, Partitioners } from 'kafkajs';
import { KafkaConfig } from '../../../../../../configs';
import { v4 as uuidv4 } from 'uuid';
@Provider({ token: ProviderTokens.KAFKA, scope: Scope.SINGLETON })
export class KafkaService {
    private kafka: Kafka;
    constructor() {
        const options = {
            clientId: KafkaConfig.CLIENT_ID,
            brokers: KafkaConfig.BROKERS,
            // ssl: {
            //     rejectUnauthorized: false
            // },
            // sasl: {
            //     mechanism: 'scram-sha-256', // scram-sha-256 or scram-sha-512
            //     username: KafkaConfig.USERNAME,
            //     password: KafkaConfig.PASSWORD
            // }
        };
        this.kafka = new Kafka(options);
    }

    // Consumer: Starts the Kafka Consumer, and takes process callback function
    async startConsumer(topic: string, messageHandler: EachMessageHandler) {
        const consumer = this.kafka.consumer({ groupId: KafkaConfig.GROUP_ID });
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: false });
        await consumer.run({
            eachMessage: messageHandler,
        });
    }

    // Producer: sends message to the topic
    async sendMessage(topic: string, message: object) {
        const producer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
        await producer.connect();

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message), key: uuidv4() }],
        });

        await producer.disconnect();

        return producer;
    }
}
