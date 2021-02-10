## Backend setup

#### Setup repo
- Create a virtualenv using `python3 -m venv env`.
- Activate the virtual env with `source <path_to_env>/env/bin/activate`.
- Install requirements with `pip install -r requirements.txt`.
- Set `FLASK_APP=app.py` to the environment variable with `export FLASK_APP=app.py` for linux and `set FLASK_APP=app.py` for windows.

#### Setup database
- Install mariadb or mysql: `sudo apt install mariadb-server`. For windows, check [this link](https://www.mariadbtutorial.com/getting-started/install-mariadb/) or [this one](https://dev.mysql.com/doc/mysql-windows-excerpt/8.0/en/windows-installation.html)
- Run the database server.
- Open mysql cli and create db, user and add permissions:
  - `create database summarize;`.
  - `create user summarize@'localhost' identified by 'summarize.123';`
  - `grant all privileges on summarize.* to 'summarize'@'localhost';`
- Run `flask db upgrade` to apply migrations to your database.
