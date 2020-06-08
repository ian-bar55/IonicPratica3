import * as geolib from 'geolib';
import { Geo } from 'src/app/model/classes/geo.model';

export class GeoService {
  private geoReferencia: Geo;

  constructor() { }

  private setGeoReferencia(geo: Geo) {
    this.geoReferencia = geo;
  }

  obter3MaisProximos(referencia: Geo, geos: Geo[]) {
    this.setGeoReferencia(referencia);

    geos = geos.sort(this.sortByDistance);;

    return [geos[0], geos[1], geos[2]];
  }

  private sortByDistance(a: Geo, b: Geo) {
    if (geolib.getPreciseDistance(this.geoReferencia, a) < geolib.getPreciseDistance(this.geoReferencia, b)) {
      return -1;
    }
    if (geolib.getPreciseDistance(this.geoReferencia, a) > geolib.getPreciseDistance(this.geoReferencia, b)) {
      return 1;
    }
    return 0;
  }

}
