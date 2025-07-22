import sqlite3
import datetime

DB_FILE = 'devmate_history.db'

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS debug_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        response TEXT,
        timestamp TEXT
    )''')
    conn.commit()
    conn.close()

def insert_history(code, response):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('INSERT INTO debug_history (code, response, timestamp) VALUES (?, ?, ?)', 
              (code, response, datetime.datetime.now().isoformat()))
    conn.commit()
    conn.close()

def get_history():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT id, code, response, timestamp FROM debug_history ORDER BY id DESC LIMIT 10')
    results = c.fetchall()
    conn.close()
    return results
init_db()