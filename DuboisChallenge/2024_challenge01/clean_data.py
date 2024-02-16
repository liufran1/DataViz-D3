import geopandas as gpd
import requests
import zipfile
import tempfile
import os
import re

import pandas as pd
from shapely.geometry import Point, MultiPolygon, Polygon
from tqdm import tqdm

# Using the shapefile - need to extract all files, not just the .shp

# Set Fiona environment variable
# os.environ['SHAPE_RESTORE_SHX'] = "YES" #only needed this line because I was only extracting the .shp file and not the others, specifically the .shx

# URL of the zip file
zip_url = 'https://github.com/ajstarks/dubois-data-portraits/raw/master/challenge/2024/challenge01/georgia-1880-county-shapefile.zip'

# Download the zip file
response = requests.get(zip_url)

# Check if request was successful
if response.status_code == 200:
    # Create a temporary directory
    with tempfile.TemporaryDirectory() as tmpdirname:
        # Path to save the zip file
        zip_path = os.path.join(tmpdirname, 'georgia-1880-county-shapefile.zip')

        # Write the content of the zip file
        with open(zip_path, 'wb') as f:
            f.write(response.content)

        # Extract the zip file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # List files in the zip folder
            file_list = zip_ref.namelist()

            # Check if there are any files
            if len(file_list) > 0:
                # Assuming the first file in the zip folder is the shapefile
                for file in file_list:
                    zip_ref.extract(file, tmpdirname)

                first_shapefile = file_list[0]

                # Extract the shapefile to temporary directory
                zip_ref.extract(first_shapefile, tmpdirname)

                # Read the shapefile into a GeoDataFrame
                gdf = gpd.read_file(os.path.join(tmpdirname, first_shapefile))

                # Display the GeoDataFrame
                print(gdf.head())

            else:
                print("No files found in the zip folder.")
else:
    print("Failed to download the zip file.")

gdf.rename(columns={'data1880_P':'data1880', 'data1870 (': 'data1870'}, inplace=True)
gdf['data1870'].fillna(gdf['data1880'], inplace=True)

color_map = {
    '20000 - 30000': '#332659',
    '15000 - 20000': '#704a34',
    '10000 - 15000': '#d4a96e',
    '5000 - 10000': '#ce3b50',
    '2500 - 5000' : '#dea59b',
    '1000 - 2500': '#e6ab38',
    '> 1000': '#4e5449'

}

gdf.to_file("georgia_data.json", driver="GeoJSON")