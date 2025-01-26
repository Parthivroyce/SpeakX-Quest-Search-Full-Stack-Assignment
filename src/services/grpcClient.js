import { SearchServiceClient } from '../generated/search_grpc_web_pb';

const client = new SearchServiceClient('http://localhost:50051');

export default client;
