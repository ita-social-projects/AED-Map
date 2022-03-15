/* MapBox API */
import http from '../../../shared/http/'

const URL = 'https://api.mapbox.com/'
const VERSION = 'v5'
// TODO: Check if token is public.
const TOKEN = 'pk.eyJ1Ijoib3Nrb3ZiYXNpdWsiLCJhIjoiY2s1NWVwcnhhMDhrazNmcGNvZjJ1MnA4OSJ9.56GsGp2cl6zpYh-Ns8ThxA';

export const getDirections = (start, end, data) => {
    return http.get(
        `${URL}directions/${VERSION}/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&steps=true&geometries=geojson&access_token=${TOKEN}`,
        data
    )
}