from flask import Flask
from flask_cors import CORS
from Routes.Personal import Personal

app = Flask(__name__)
app.secret_key = 'Prueba_crud_if'

if __name__ == '__main__':
    app.register_blueprint(Personal)
    CORS(app)
    app.run(port=3000, debug=True)
