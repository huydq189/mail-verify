// Kafka configuration
export const KafkaConfig = {
    CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'default',
    GROUP_ID: process.env.KAFKA_GROUP_ID || 'email-service',
    BROKERS: (process.env.KAFKA_BROKERS && process.env.KAFKA_BROKERS.split(',')) || ['localhost:9092'],
    USERNAME: process.env.KAFKA_USERNAME,
    PASSWORD: process.env.KAFKA_PASSWORD,
    TOPIC_PREFIX: process.env.KAFKA_TOPIC || 'mail.topic.',
};
