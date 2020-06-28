const { HandleRequest } = require('kuaizi')

const clct = new HandleRequest.Collector('/api/settings', [checkLogin, checkPermission])

// clct.get()
// clct.post()
// clct.put()
// clct.delete()