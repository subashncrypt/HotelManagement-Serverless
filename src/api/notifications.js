// Reference
// https://cloud.google.com/nodejs/docs/reference/pubsub/latest

const {PubSub} = require('@google-cloud/pubsub');
const allNotifications = []
let currentUser = JSON.parse(localStorage.getItem("BB_USER"));

async function createASubscription(
  projectId = process.env.REACT_APP_GCP_PROJECT_ID, 
  topicNameOrId = process.env.REACT_APP_NOTIFICATIONS_QUEUE_ENDPOINT, 
  subscriptionName = currentUser.email 
) {
  const pubsub = new PubSub({projectId});
  // Creates a new topic for notifications if doesn't exist
  const [topic] = await pubsub.createTopic(topicNameOrId);

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);

  // Listen for notifications
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    allNotifications.push(message.data.toString())
    process.exit(0);
  });

  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });
}