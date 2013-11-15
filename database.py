from sqlalchemy import create_engine, Column, Integer, Table
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

engine = create_engine('postgresql:///game', convert_unicode=True)
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = session.query_property()

def init_db():
    Base.metadata.create_all(bind=engine)
