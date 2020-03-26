type RequestContext = import('../ctx/request')
type RequestHandler = (ctx: RequestContext) => any
type RequestGlove = (fn: RequestHandler, ctx: RequestContext) => RequestHandler
type IncomingMessage = import('http').IncomingMessage
type ServerResponse = import('http').ServerResponse

export {
  RequestContext,
  RequestHandler,
  RequestGlove,
  IncomingMessage,
  ServerResponse
}