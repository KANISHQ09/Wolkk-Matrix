"""
Custom BigQuery tools for querying GCP billing data.
These tools are used by the GCPCostAgent to retrieve cost information
directly from BigQuery without needing a separate Toolbox server.
"""

import os
import json
from typing import Optional
from google.cloud import bigquery


# Configuration - reads from environment or uses defaults
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "promptwars2-495214")
BILLING_TABLE = os.environ.get(
    "BILLING_TABLE",
    "promptwars2-495214.trial.gcp_billing_export_resource_v1_011EA5_074385_C2B410"
)


def _get_bq_client(project_id: str) -> bigquery.Client:
    """Create and return a BigQuery client for the given project."""
    return bigquery.Client(project=project_id)


def _format_results(rows) -> str:
    """Format BigQuery results into a readable string."""
    results = []
    for row in rows:
        results.append(dict(row))
    if not results:
        return json.dumps({"status": "no_data", "message": "No data found for the specified parameters."})
    return json.dumps(results, default=str, indent=2)


def get_monthly_cost_summary(invoice_month: str, project_id: str, billing_table: str) -> str:
    """Retrieves a summary of Google Cloud costs for a specific invoice month.
    
    Use this tool when the user asks about the total bill, overall spending,
    or a general cost summary for a given month.
    
    Args:
        invoice_month: The invoice month in YYYYMM format (e.g., '202604' for April 2026).
        project_id: The GCP project ID where the BigQuery billing dataset resides.
        billing_table: The fully qualified BigQuery table name (e.g., 'project.dataset.table').
    
    Returns:
        A JSON string containing the total cost and currency for the specified month.
    """
    client = _get_bq_client(project_id)
    query = f"""
        SELECT
            invoice.month,
            SUM(cost) AS total_cost,
            SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) AS total_credits,
            SUM(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) AS final_cost,
            currency
        FROM
            `{billing_table}`
        WHERE
            invoice.month = @invoice_month
        GROUP BY
            invoice.month, currency
        ORDER BY
            invoice.month
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("invoice_month", "STRING", invoice_month)
        ]
    )
    try:
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()
        return _format_results(results)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})


def get_cost_by_project(invoice_month: str, project_id: str, billing_table: str) -> str:
    """Retrieves a breakdown of Google Cloud costs by project for a specific invoice month.
    
    Use this tool when the user asks about spending per project, which project
    costs the most, or wants a project-level breakdown of costs.
    
    Args:
        invoice_month: The invoice month in YYYYMM format (e.g., '202604' for April 2026).
        project_id: The GCP project ID where the BigQuery billing dataset resides.
        billing_table: The fully qualified BigQuery table name (e.g., 'project.dataset.table').
    
    Returns:
        A JSON string containing costs grouped by project, ordered from most to least expensive.
    """
    client = _get_bq_client(project_id)
    query = f"""
        SELECT
            project.name AS project_name,
            project.id AS project_id,
            SUM(cost) AS final_cost,
            currency
        FROM
            `{billing_table}`
        WHERE
            invoice.month = @invoice_month
        GROUP BY
            project.name, project.id, currency
        ORDER BY
            final_cost DESC
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("invoice_month", "STRING", invoice_month)
        ]
    )
    try:
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()
        return _format_results(results)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})


def get_cost_by_service(invoice_month: str, project_id: str, billing_table: str) -> str:
    """Retrieves a breakdown of Google Cloud costs by service for a specific invoice month.
    
    Use this tool when the user asks about spending per service (e.g., Compute Engine,
    BigQuery, Cloud Storage), which services cost the most, or wants a service-level
    breakdown of costs.
    
    Args:
        invoice_month: The invoice month in YYYYMM format (e.g., '202604' for April 2026).
        project_id: The GCP project ID where the BigQuery billing dataset resides.
        billing_table: The fully qualified BigQuery table name (e.g., 'project.dataset.table').
    
    Returns:
        A JSON string containing costs grouped by service, ordered from most to least expensive.
    """
    client = _get_bq_client(project_id)
    query = f"""
        SELECT
            service.description AS service_name,
            SUM(cost) AS final_cost,
            currency
        FROM
            `{billing_table}`
        WHERE
            invoice.month = @invoice_month
        GROUP BY
            service.description, currency
        ORDER BY
            final_cost DESC
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("invoice_month", "STRING", invoice_month)
        ]
    )
    try:
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()
        return _format_results(results)
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})
