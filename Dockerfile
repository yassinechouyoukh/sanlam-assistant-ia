FROM python:3.12-slim

WORKDIR /app

# Install deps first — layer is cached as long as requirements.txt doesn't change
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and FAQ data
COPY src/ ./src/
COPY data/ ./data/

# Download the embedding model and build chroma_db into the image.
# ingest.py computes ROOT = dirname(dirname(__file__)) = /app,
# so it writes /app/chroma_db/ and reads /app/data/*.csv correctly.
RUN python src/ingest.py

EXPOSE 8000

# Bind to 0.0.0.0 so the port is reachable from outside the container
CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8000"]
