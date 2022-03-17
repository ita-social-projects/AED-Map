/* MapBox API */
import { MAPBOX_TOKEN } from '../../../consts/keys'
import http from '../../../shared/http/'

const URL = 'https://api.mapbox.com/'
const VERSION = 'v5'

export const getDirections = (start, end, data) => {
    return http.get(
        `${URL}directions/${VERSION}/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`,
        data
    )
}