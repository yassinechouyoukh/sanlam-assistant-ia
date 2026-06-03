FROM python:3.12-slim

WORKDIR /app

# Install CPU-only PyTorch FIRST so pip sees torch already satisfied
# and skips every CUDA/NVIDIA wheel when processing requirements.txt.
# This cuts the image by ~2.5 GB compared to the default CUDA build.
COPY requirements.txt .
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu
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
