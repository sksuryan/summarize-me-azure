from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# These are imported below the initialization
# setup to avoid circular imports
import routes, models

if __name__ == '__main__':
  app.run(debug=True)