import { MessagingService, OnStart, Consumer, Publisher } from '@heronjs/common';

@MessagingService()
export class KafkaService {
    @Publisher()
    start = async () => {
        // logic here
    };

    @Consumer('send-noti')
    sendLog = async () => {
        // logic here
    };

    @OnStart()
    start = async () => {
        // logic here
    };
}
