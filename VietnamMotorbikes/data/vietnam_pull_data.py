import geopandas as gpd
import pandas as pd
from shapely.ops import unary_union
import requests


def pull_geo_data():
    url = 'https://github.com/nguyenduy1133/Free-GIS-Data/blob/c1a1dc5adae1a80ecbff77ae88bd758801004de9/VietNam/Administrative/Provinces_included_Paracel_SpratlyIslands_combine.geojson?raw=true'

    r = requests.get(url)

    with open('provinces.geojson', 'wb') as f:
      f.write(r.content)


    vietnam_districts = gpd.read_file('https://data.opendevelopmentmekong.net/dataset/6f054351-bf2c-422e-8deb-0a511d63a315/resource/78b3fb31-8c96-47d3-af64-d1a6e168e2ea/download/diaphanhuyen.geojson')

    vietnam_district_population = vietnam_districts.copy()
    vietnam_district_population['point_geom'] = vietnam_district_population['geometry'].centroid
    vietnam_district_population['geometry'] = vietnam_district_population.apply(lambda x: x['point_geom'].buffer(x['Dan_So']/2000000), axis=1)

    vietnam_gdf = gpd.read_file('provinces.geojson')
    boundary = gpd.GeoSeries(unary_union(vietnam_gdf['geometry']))


    boundary.to_file('vietnam_boundary.geojson')
    vietnam_district_population[['Ten_Tinh','Ten_Huyen','geometry']].to_file('vietnam_districts.geojson')


def format_vehicle_data():
    df = pd.read_csv('Vietnam Motorbikes - Sheet1.csv') # https://docs.google.com/spreadsheets/d/1icaOCRUSklLu0VCTyINQTLoaDbnm_lO0TZTN0DVHqvM/edit#gid=0
    df['Total number of registered motorcycles'] = df['Total number of registered motorcycles'].astype('str').str.replace(',','').astype('float').astype('Int64')
    df['Total number of registered cars'] = df['Total number of registered cars'].astype('str').str.replace(',','').astype('float').astype('Int64')
    df['Population'] = df['Population'].astype('str').str.replace(',','').astype('float').astype('Int64')

    df.to_csv('VietnamVehicles_1991-2022.csv',index=False)

def format_gdp_data():
    df = pd.read_csv('API_NY.GDP.PCAP.CD_DS2_en_csv_v2_184.csv') #https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=VN
    out_df = pd.melt(df.loc[df['Country Code']=='VNM'], id_vars=['Country Name', 'Country Code', 'Indicator Name', 'Indicator Code'])[:63]
    out_df.rename(columns={'variable':'Year', 'value':'GDPperCapita'}, inplace=True)
    out_df['Year'] = out_df['Year'].astype('int')
    out_df.loc[out_df['Year']>1990][['Country Code','Year','GDPperCapita']].to_csv('VietnamGDPpcap_1991-2022.csv',index=False)