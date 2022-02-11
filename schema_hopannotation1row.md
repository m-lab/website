| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | Annotation ID is a daily unique identifier for Hop Annotations to join with traceroute datasets. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING |  |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING |  |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
| **raw** | RECORD | Fields from the raw data. |
| raw.**ID** | STRING | Annotation ID is a daily unique identifier for Hop Annotations to join with traceroute datasets. |
| raw.**Timestamp** | TIMESTAMP | Scamper cycle start time. |
| raw.**Annotations** | RECORD |  |
| raw.Annotations.**Geo** | RECORD | Geolocation information annotated using MaxMind, which is known to be less accurate for infrastructure IPs in traceroute hops. |
| raw.Annotations.Geo.**ContinentCode** | STRING |  |
| raw.Annotations.Geo.**CountryCode** | STRING |  |
| raw.Annotations.Geo.**CountryCode3** | STRING |  |
| raw.Annotations.Geo.**CountryName** | STRING |  |
| raw.Annotations.Geo.**Region** | STRING |  |
| raw.Annotations.Geo.**Subdivision1ISOCode** | STRING |  |
| raw.Annotations.Geo.**Subdivision1Name** | STRING |  |
| raw.Annotations.Geo.**Subdivision2ISOCode** | STRING |  |
| raw.Annotations.Geo.**Subdivision2Name** | STRING |  |
| raw.Annotations.Geo.**MetroCode** | INTEGER |  |
| raw.Annotations.Geo.**City** | STRING |  |
| raw.Annotations.Geo.**AreaCode** | INTEGER |  |
| raw.Annotations.Geo.**PostalCode** | STRING |  |
| raw.Annotations.Geo.**Latitude** | FLOAT |  |
| raw.Annotations.Geo.**Longitude** | FLOAT |  |
| raw.Annotations.Geo.**AccuracyRadiusKm** | INTEGER |  |
| raw.Annotations.Geo.**Missing** | BOOLEAN | The annotator looked for but was unable to find a Geo location for this IP. |
| raw.Annotations.**Network** | RECORD | Network information about connection. |
| raw.Annotations.Network.**CIDR** | STRING |  |
| raw.Annotations.Network.**ASNumber** | INTEGER | The Autonomous System Number, provided by RouteViews. |
| raw.Annotations.Network.**ASName** | STRING | Canonical name for the ASN, provided by ipinfo.io. |
| raw.Annotations.Network.**Missing** | BOOLEAN | The annotator looked but was unable to find a network for this IP. |
| raw.Annotations.Network.**Systems** | RECORD |  |
| raw.Annotations.Network.Systems.**ASNs** | INTEGER |  |
