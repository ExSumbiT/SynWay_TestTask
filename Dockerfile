FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /app/api
COPY . ./
RUN pip install -r /app/api/requirements.txt
EXPOSE 8000