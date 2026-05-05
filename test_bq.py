from google.cloud import bigquery
import os

project_id = "promptwars2-495214"
billing_table = "promptwars2-495214.trial.gcp_billing_export_resource_v1_011EA5_074385_C2B410"

client = bigquery.Client(project=project_id)
query = f"SELECT invoice.month, SUM(cost) as cost FROM `{billing_table}` GROUP BY 1 LIMIT 5"

print(f"Testing BigQuery query on {billing_table}...", flush=True)
try:
    query_job = client.query(query)
    results = query_job.result()
    print(f"Query successful! Found {results.total_rows} rows.", flush=True)
    for row in results:
        print(dict(row), flush=True)
except Exception as e:
    print(f"BigQuery Error: {e}", flush=True)
