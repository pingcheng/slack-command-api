import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.hello`,
  events: [
    {
      http: 'ANY /'
    },
    {
      http: 'ANY /{proxy+}'
    }
  ],
};
