| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | UUID of the connection under consideration. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING | The name of the file within the ArchiveURL originally created by the measurement service. Results in the raw record are derived from measurements in this file. |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING | The git commit of this build of the parser. |
| parser.**ArchiveSize** | INTEGER | The original archive size as found in GCS. |
| parser.**FileSize** | INTEGER | The size of the file data provided to the parser for this row. |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
