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
| Source.Geo.**metro_code** | INTEGER |  |
| Source.Geo.**city** | STRING |  |
| Source.Geo.**area_code** | INTEGER |  |
| Source.Geo.**postal_code** | STRING |  |
| Source.Geo.**latitude** | FLOAT |  |
| Source.Geo.**longitude** | FLOAT |  |
| Source.Geo.**radius** | INTEGER |  |
| Source.**Network** | RECORD | Network information about connection. |
| Source.Network.**IPPrefix** | STRING |  |
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
| Destination.Geo.**metro_code** | INTEGER |  |
| Destination.Geo.**city** | STRING |  |
| Destination.Geo.**area_code** | INTEGER |  |
| Destination.Geo.**postal_code** | STRING |  |
| Destination.Geo.**latitude** | FLOAT |  |
| Destination.Geo.**longitude** | FLOAT |  |
| Destination.Geo.**radius** | INTEGER |  |
| Destination.**Network** | RECORD | Network information about connection. |
| Destination.Network.**IPPrefix** | STRING |  |
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
| Hop.**Linkc** | INTEGER |  |
| Hop.**Links** | RECORD |  |
| Hop.Links.**HopDstIP** | STRING |  |
| Hop.Links.**TTL** | INTEGER |  |
| Hop.Links.**Probes** | RECORD |  |
| Hop.Links.Probes.**Flowid** | INTEGER |  |
| Hop.Links.Probes.**Rtt** | FLOAT |  |
| **exp_version** | STRING |  |
| **cached_result** | BOOLEAN |  |
