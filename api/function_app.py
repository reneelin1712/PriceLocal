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
