import zipfile
import os

# Path to the ZIP file
zip_file_path = '/content/TrainingData.zip'

# Destination folder where files will be extracted
extract_to_folder = '/content/'

# Ensure the destination folder exists
os.makedirs(extract_to_folder, exist_ok=True)

# Open the ZIP file
with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
    # Extract all the contents to the destination folder
    zip_ref.extractall(extract_to_folder)

print(f"Files extracted to '{extract_to_folder}'")