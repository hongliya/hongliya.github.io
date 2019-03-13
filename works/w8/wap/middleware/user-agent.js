export default function (context) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
    context.userIp = context.req.connection.remoteAddress
    // const ip =
    //   req.headers['x-forwarded-for'].split(',').pop() || // From proxy headers, can be spoofed if you don't have a proxy in front of your app, so drop it if your app is naked.
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress || // socket is an alias to connection, just delete this line
    //   req.connection.socket.remoteAddress // no idea where this might be a thing, just delete this line
    // probably add a default at the end here, although there shouldn't be a case when req.connection.remoteAddress is unset.
}

/**
 *
 export default ({
   req,
   store
 }) => {
   if (process.server) {
     // https://github.com/nuxt/nuxt.js/issues/2914
     const ip = req.connection.remoteAddress || req.socket.remoteAddress
     store.commit('SET_IP', ip)
   }
   if (process.client) {
     localStorage.setItem('ip', store.getters.ip)
   }
 }
 */