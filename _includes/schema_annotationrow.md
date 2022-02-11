| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | UUID of the connection under consideration. |
| **server** | RECORD | Location information about the M-Lab server that collected the measurement. |
| server.**Site** | STRING | The M-Lab site name. |
| server.**Machine** | STRING | The machine name within the site. |
| server.**Geo** | RECORD |  |
| server.Geo.**ContinentCode** | STRING |  |
| server.Geo.**CountryCode** | STRING |  |
| server.Geo.**CountryCode3** | STRING |  |
| server.Geo.**CountryName** | STRING |  |
| server.Geo.**Region** | STRING |  |
| server.Geo.**Subdivision1ISOCode** | STRING |  |
| server.Geo.**Subdivision1Name** | STRING |  |
| server.Geo.**Subdivision2ISOCode** | STRING |  |
| server.Geo.**Subdivision2Name** | STRING |  |
| server.Geo.**MetroCode** | INTEGER |  |
| server.Geo.**City** | STRING |  |
| server.Geo.**AreaCode** | INTEGER |  |
| server.Geo.**PostalCode** | STRING |  |
| server.Geo.**Latitude** | FLOAT |  |
| server.Geo.**Longitude** | FLOAT |  |
| server.Geo.**AccuracyRadiusKm** | INTEGER |  |
| server.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| server.**Network** | RECORD | Network information about connection. |
| server.Network.**CIDR** | STRING |  |
| server.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| server.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| server.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| server.Network.**Systems** | RECORD |  |
| server.Network.Systems.**ASNs** | INTEGER |  |
| **client** | RECORD | Location information about the client that initiated the measurement. |
| client.**Geo** | RECORD |  |
| client.Geo.**ContinentCode** | STRING |  |
| client.Geo.**CountryCode** | STRING |  |
| client.Geo.**CountryCode3** | STRING |  |
| client.Geo.**CountryName** | STRING |  |
| client.Geo.**Region** | STRING |  |
| client.Geo.**Subdivision1ISOCode** | STRING |  |
| client.Geo.**Subdivision1Name** | STRING |  |
| client.Geo.**Subdivision2ISOCode** | STRING |  |
| client.Geo.**Subdivision2Name** | STRING |  |
| client.Geo.**MetroCode** | INTEGER |  |
| client.Geo.**City** | STRING |  |
| client.Geo.**AreaCode** | INTEGER |  |
| client.Geo.**PostalCode** | STRING |  |
| client.Geo.**Latitude** | FLOAT |  |
| client.Geo.**Longitude** | FLOAT |  |
| client.Geo.**AccuracyRadiusKm** | INTEGER |  |
| client.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| client.**Network** | RECORD | Network information about connection. |
| client.Network.**CIDR** | STRING |  |
| client.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| client.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| client.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| client.Network.**Systems** | RECORD |  |
| client.Network.Systems.**ASNs** | INTEGER |  |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING |  |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING |  |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
