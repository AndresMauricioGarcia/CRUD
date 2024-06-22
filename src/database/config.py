from dotenv import load_dotenv
import os

import psycopg2

load_dotenv()

user = os.getenv('USER')
host = os.getenv('HOST')
password = os.getenv('PASSWORD')
database = os.getenv('DATABASE')
port = os.getenv('PORT')

connect = psycopg2.connect(dbname=database, user=user, password=password, host=host, port=port)
