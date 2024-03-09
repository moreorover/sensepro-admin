"""
This module contains API endpoints.
"""
from flask import Flask, jsonify

app = Flask(__name__)


"""
This is API / route.
"""
@app.route('/')
def hello_world():
    """
    This function returns a JSON response with 'hello' set to 'world'.
    """
    return jsonify({'hello': 'world'})


if __name__ == '__main__':
    app.run()
