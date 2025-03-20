# import azure.functions as func
# import json
# import pyodbc
# import os

# # Create an Azure Function App instance
# app = func.FunctionApp()

# # Database Connection Config
# SERVER = os.getenv("DB_SERVER")  # Example: "your-server.database.windows.net"
# DATABASE = os.getenv("DB_NAME")  # "competitor"
# USERNAME = os.getenv("DB_USER")  # "your-username"
# PASSWORD = os.getenv("DB_PASSWORD")  # "your-password"
# DRIVER = "{ODBC Driver 18 for SQL Server}"  # Ensure this driver is installed

# # Function to get customers from Azure SQL Database
# @app.function_name(name="get_customers")
# @app.route(route="customers")  # This makes the function accessible at /api/customers
# def get_customers(req: func.HttpRequest) -> func.HttpResponse:
#     try:
#         # Connect to SQL Database
#         conn = pyodbc.connect(
#             f"DRIVER={DRIVER};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD}"
#         )
#         cursor = conn.cursor()

#         # Fetch data from Customers table
#         cursor.execute("SELECT CustomerID, CustomerName FROM Customers")
#         customers = [
#             {"CustomerID": row[0], "CustomerName": row[1]}
#             for row in cursor.fetchall()
#         ]

#         conn.close()
#         return func.HttpResponse(json.dumps(customers), mimetype="application/json")

#     except Exception as e:
#         return func.HttpResponse(f"Error: {str(e)}", status_code=500)


import azure.functions as func
import datetime
import json
import logging

app = func.FunctionApp()

@app.function_name(name="hello")
@app.route(route="hello")  # This makes the function accessible at /api/hello
def hello(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Hello function triggered")
    return func.HttpResponse(
        json.dumps({"message": "Hello from Azure Static Web Apps API!"}),
        mimetype="application/json"
    )
