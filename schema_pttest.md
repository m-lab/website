| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **uuid** | STRING |  |
| **TestTime** | TIMESTAMP |  |
| **Parseinfo** | RECORD |  |
| Parseinfo.**TaskFileName** | STRING |  |
| Parseinfo.**ParseTime** | TIMESTAMP |  |
| Parseinfo.**ParserVersion** | STRING |  |
| Parseinfo.**Filename** | STRING |  |
| **start_time** | INTEGER |  |
| **stop_time** | INTEGER |  |
| **scamper_version** | STRING |  |
| **Source** | RECORD |  |
| Source.**IP** | STRING |  |
| Source.**Port** | INTEGER |  |
| Source.**IATA** | STRING |  |
| Source.**Geo** | RECORD |  |
| Source.Geo.**continent_code** | STRING |  |
| Source.Geo.**country_code** | STRING |  |
| Source.Geo.**country_code3** | STRING |  |
| Source.Geo.**country_name** | STRING |  |
| Source.Geo.**region** | STRING |  |
| Source.Geo.**Subdivision1ISOCode** | STRING |  |
| Source.Geo.**Subdivision1Name** | STRING |  |
| Source.Geo.**Subdivision2ISOCode** | STRING |  |
| Source.Geo.**Subdivision2Name** | STRING |  |
| Source.Geo.**metro_code** | INTEGER |  |
| Source.Geo.**city** | STRING |  |
| Source.Geo.**area_code** | INTEGER |  |
| Source.Geo.**postal_code** | STRING |  |
| Source.Geo.**latitude** | FLOAT |  |
| Source.Geo.**longitude** | FLOAT |  |
| Source.Geo.**radius** | INTEGER |  |
| Source.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| Source.**Network** | RECORD | Network information about connection. |
| Source.Network.**IPPrefix** | STRING |  |
| Source.Network.**CIDR** | STRING |  |
| Source.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| Source.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| Source.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| Source.Network.**Systems** | RECORD |  |
| Source.Network.Systems.**ASNs** | INTEGER |  |
| **Destination** | RECORD |  |
| Destination.**IP** | STRING |  |
| Destination.**Port** | INTEGER |  |
| Destination.**Geo** | RECORD |  |
| Destination.Geo.**continent_code** | STRING |  |
| Destination.Geo.**country_code** | STRING |  |
| Destination.Geo.**country_code3** | STRING |  |
| Destination.Geo.**country_name** | STRING |  |
| Destination.Geo.**region** | STRING |  |
| Destination.Geo.**Subdivision1ISOCode** | STRING |  |
| Destination.Geo.**Subdivision1Name** | STRING |  |
| Destination.Geo.**Subdivision2ISOCode** | STRING |  |
| Destination.Geo.**Subdivision2Name** | STRING |  |
| Destination.Geo.**metro_code** | INTEGER |  |
| Destination.Geo.**city** | STRING |  |
| Destination.Geo.**area_code** | INTEGER |  |
| Destination.Geo.**postal_code** | STRING |  |
| Destination.Geo.**latitude** | FLOAT |  |
| Destination.Geo.**longitude** | FLOAT |  |
| Destination.Geo.**radius** | INTEGER |  |
| Destination.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| Destination.**Network** | RECORD | Network information about connection. |
| Destination.Network.**IPPrefix** | STRING |  |
| Destination.Network.**CIDR** | STRING |  |
| Destination.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| Destination.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| Destination.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| Destination.Network.**Systems** | RECORD |  |
| Destination.Network.Systems.**ASNs** | INTEGER |  |
| **ProbeSize** | INTEGER |  |
| **ProbeC** | INTEGER |  |
| **Hop** | RECORD |  |
| Hop.**Source** | RECORD |  |
| Hop.Source.**IP** | STRING |  |
| Hop.Source.**City** | STRING |  |
| Hop.Source.**CountryCode** | STRING |  |
| Hop.Source.**Hostname** | STRING |  |
| Hop.Source.**ASN** | INTEGER |  |
| Hop.Source.**HopAnnotation1** | RECORD |  |
| Hop.Source.HopAnnotation1.**ID** | STRING |  |
| Hop.Source.HopAnnotation1.**Timestamp** | TIMESTAMP |  |
| Hop.Source.HopAnnotation1.**Annotations** | RECORD |  |
| Hop.Source.HopAnnotation1.Annotations.**Geo** | RECORD |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**ContinentCode** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**CountryCode** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**CountryCode3** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**CountryName** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Region** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Subdivision1ISOCode** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Subdivision1Name** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Subdivision2ISOCode** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Subdivision2Name** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**MetroCode** | INTEGER |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**City** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**AreaCode** | INTEGER |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**PostalCode** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Latitude** | FLOAT |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Longitude** | FLOAT |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**AccuracyRadiusKm** | INTEGER |  |
| Hop.Source.HopAnnotation1.Annotations.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| Hop.Source.HopAnnotation1.Annotations.**Network** | RECORD | Network information about connection. |
| Hop.Source.HopAnnotation1.Annotations.Network.**CIDR** | STRING |  |
| Hop.Source.HopAnnotation1.Annotations.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| Hop.Source.HopAnnotation1.Annotations.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| Hop.Source.HopAnnotation1.Annotations.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| Hop.Source.HopAnnotation1.Annotations.Network.**Systems** | RECORD |  |
| Hop.Source.HopAnnotation1.Annotations.Network.Systems.**ASNs** | INTEGER |  |
| Hop.**Linkc** | INTEGER |  |
| Hop.**Links** | RECORD |  |
| Hop.Links.**HopDstIP** | STRING |  |
| Hop.Links.**TTL** | INTEGER |  |
| Hop.Links.**Probes** | RECORD |  |
| Hop.Links.Probes.**Flowid** | INTEGER |  |
| Hop.Links.Probes.**Rtt** | FLOAT |  |
| **exp_version** | STRING |  |
| **cached_result** | BOOLEAN |  |
| **ServerX** | RECORD |  |
| ServerX.**Site** | STRING |  |
| ServerX.**Machine** | STRING |  |
| ServerX.**Geo** | RECORD |  |
| ServerX.Geo.**ContinentCode** | STRING |  |
| ServerX.Geo.**CountryCode** | STRING |  |
| ServerX.Geo.**CountryCode3** | STRING |  |
| ServerX.Geo.**CountryName** | STRING |  |
| ServerX.Geo.**Region** | STRING |  |
| ServerX.Geo.**Subdivision1ISOCode** | STRING |  |
| ServerX.Geo.**Subdivision1Name** | STRING |  |
| ServerX.Geo.**Subdivision2ISOCode** | STRING |  |
| ServerX.Geo.**Subdivision2Name** | STRING |  |
| ServerX.Geo.**MetroCode** | INTEGER |  |
| ServerX.Geo.**City** | STRING |  |
| ServerX.Geo.**AreaCode** | INTEGER |  |
| ServerX.Geo.**PostalCode** | STRING |  |
| ServerX.Geo.**Latitude** | FLOAT |  |
| ServerX.Geo.**Longitude** | FLOAT |  |
| ServerX.Geo.**AccuracyRadiusKm** | INTEGER |  |
| ServerX.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| ServerX.**Network** | RECORD | Network information about connection. |
| ServerX.Network.**CIDR** | STRING |  |
| ServerX.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| ServerX.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| ServerX.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| ServerX.Network.**Systems** | RECORD |  |
| ServerX.Network.Systems.**ASNs** | INTEGER |  |
| **ClientX** | RECORD |  |
| ClientX.**Geo** | RECORD |  |
| ClientX.Geo.**ContinentCode** | STRING |  |
| ClientX.Geo.**CountryCode** | STRING |  |
| ClientX.Geo.**CountryCode3** | STRING |  |
| ClientX.Geo.**CountryName** | STRING |  |
| ClientX.Geo.**Region** | STRING |  |
| ClientX.Geo.**Subdivision1ISOCode** | STRING |  |
| ClientX.Geo.**Subdivision1Name** | STRING |  |
| ClientX.Geo.**Subdivision2ISOCode** | STRING |  |
| ClientX.Geo.**Subdivision2Name** | STRING |  |
| ClientX.Geo.**MetroCode** | INTEGER |  |
| ClientX.Geo.**City** | STRING |  |
| ClientX.Geo.**AreaCode** | INTEGER |  |
| ClientX.Geo.**PostalCode** | STRING |  |
| ClientX.Geo.**Latitude** | FLOAT |  |
| ClientX.Geo.**Longitude** | FLOAT |  |
| ClientX.Geo.**AccuracyRadiusKm** | INTEGER |  |
| ClientX.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| ClientX.**Network** | RECORD | Network information about connection. |
| ClientX.Network.**CIDR** | STRING |  |
| ClientX.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| ClientX.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| ClientX.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| ClientX.Network.**Systems** | RECORD |  |
| ClientX.Network.Systems.**ASNs** | INTEGER |  |
