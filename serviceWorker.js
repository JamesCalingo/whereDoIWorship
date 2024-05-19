const staticDev = "dev-wdiw-v1"
const assets = [
    "/",
    "/index.html",
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticDev).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request)
        })
    )
})