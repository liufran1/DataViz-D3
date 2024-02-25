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
    df = pd.read_csv('API_NY.GDP.PCAP.CD_DS2_en_csv_v2_184.csv') #https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=VN. manually delete the first three rows of header metadata first
    out_df = pd.melt(df.loc[df['Country Code']=='VNM'], id_vars=['Country Name', 'Country Code', 'Indicator Name', 'Indicator Code'])[:63]
    out_df.rename(columns={'variable':'Year', 'value':'GDPperCapita'}, inplace=True)
    out_df['Year'] = out_df['Year'].astype('int')
    out_df.loc[out_df['Year']>1990][['Country Code','Year','GDPperCapita']].to_csv('VietnamGDPpcap_1991-2022.csv',index=False)

def format_carbon_data():
    df = pd.read_csv('API_EN.ATM.CO2E.KT_DS2_en_csv_v2_542.csv')
    out_df = pd.melt(df.loc[df['Country Code']=='VNM'], id_vars=['Country Name', 'Country Code', 'Indicator Name', 'Indicator Code'])[:63]
    out_df.rename(columns={'variable':'Year', 'value':'CO2_emissions'}, inplace=True)
    out_df['Year'] = out_df['Year'].astype('int')
    out_df.loc[out_df['Year']>1990][['Country Code','Year','CO2_emissions']].to_csv('VietnamCO2_1991-2022.csv',index=False)

def format_carbon_breakdown_data():
    df = pd.read_csv('ghg-emissions-by-sector.csv') # https://ourworldindata.org/grapher/ghg-emissions-by-sector?tab=table&time=latest&country=~VNM
    out_df = pd.melt(df.loc[df['Code']=='VNM'], id_vars=['Entity', 'Code', 'Year'])
    out_df.loc[df['Code']=='VNM'].to_csv('VietnamCarbonSources_1990-2020.csv', index=False)

def format_health_data(): 
    df = pd.read_csv('number-of-deaths-by-risk-factor.csv') # https://ourworldindata.org/outdoor-air-pollution
    out_df = pd.melt(df.loc[df['Code']=='VNM'], id_vars=['Entity', 'Code', 'Year']).replace('Deaths that are from all causes attributed to ','', regex=True).replace(', in both sexes aged all ages', '', regex=True)
    # Categorization via ChatGPT 3.5. 
    # Prompt: """
    # the following is a list of causes of death - group them into categories. for example, "diet low in fruits" and "diet high in sodium" could both be collapsed into "diet":  ['high systolic blood pressure', 'diet high in sodium',
    #        'diet low in whole grains', 'alcohol use', 'diet low in fruits',
    #        'unsafe water source', 'secondhand smoke', 'low birth weight',
    #        'child wasting', 'unsafe sex', 'diet low in nuts and seeds',
    #        'household air pollution from solid fuels',
    #        'diet low in vegetables', 'smoking', 'high fasting plasma glucose',
    #        'air pollution', 'high body-mass index', 'unsafe sanitation',
    #        'drug use', 'low bone mineral density', 'vitamin a deficiency',
    #        'child stunting', 'non-exclusive breastfeeding', 'iron deficiency',
    #        'ambient particulate matter pollution', 'low physical activity',
    #        'no access to handwashing facility', 'high ldl cholesterol']
    # """
    # Prompt: """the original input I provided was from a Python array - provide a python dictionary translating the original causes into the five categories you provided"""

    causes_to_categories = {
        'high systolic blood pressure': 'Health Conditions and Deficiencies',
        'diet high in sodium': 'Diet-related Factors',
        'diet low in whole grains': 'Diet-related Factors',
        'alcohol use': 'Substance Use',
        'diet low in fruits': 'Diet-related Factors',
        'unsafe water source': 'Environmental Factors',
        'secondhand smoke': 'Environmental Factors',
        'low birth weight': 'Health Conditions and Deficiencies',
        'child wasting': 'Health Conditions and Deficiencies',
        'unsafe sex': 'Environmental Factors',
        'diet low in nuts and seeds': 'Diet-related Factors',
        'household air pollution from solid fuels': 'Environmental Factors',
        'diet low in vegetables': 'Diet-related Factors',
        'smoking': 'Substance Use',
        'high fasting plasma glucose': 'Health Conditions and Deficiencies',
        'air pollution': 'Environmental Factors',
        'high body-mass index': 'Diet-related Factors',
        'unsafe sanitation': 'Environmental Factors',
        'drug use': 'Substance Use',
        'low bone mineral density': 'Health Conditions and Deficiencies',
        'vitamin a deficiency': 'Health Conditions and Deficiencies',
        'child stunting': 'Health Conditions and Deficiencies',
        'non-exclusive breastfeeding': 'Behavioral and Lifestyle Factors',
        'iron deficiency': 'Health Conditions and Deficiencies',
        'ambient particulate matter pollution': 'Environmental Factors',
        'low physical activity': 'Behavioral and Lifestyle Factors',
        'no access to handwashing facility': 'Environmental Factors',
        'high ldl cholesterol': 'Health Conditions and Deficiencies'
    }
    out_df['categories'] = out_df['variable'].apply(lambda x: causes_to_categories[x])
    out_df.to_csv('VietnamDeathCauses_1990-2019.csv', index=False)

def format_particulate_data():
    pm_df = pd.read_csv('HCMC_PMpollution - Sheet1.csv') # https://docs.google.com/spreadsheets/d/1KK8ulgPxQtF4SV-FyXXmKW_1vhL-fxAoyaU-LmlIM_Q/edit#gid=0
    pm_df = pd.melt(pm_df, id_vars=['Pollutant', 'Source']) # Pollution measured in millions kg
    pm_df.rename(columns={'variable':'Year'},inplace=True)
    pm_df['Year'] = pm_df['Year'].astype('int')
    pm_df.to_csv('HCMC_PMpollution.csv')

def format_air_quality_data():
    newyork_df = pd.read_csv('/home/franklin/Downloads/new-york-air-quality.csv')
    hanoi_df = pd.read_csv('/home/franklin/Downloads/hanoi,-vietnam-air-quality.csv')
    # hcmc_df = pd.read_csv('/home/franklin/Downloads/ho-chi minh city us consulate, vietnam-air-quality.csv') looks like HCMC is currently offline

    newyork_df['city'] = "New York"
    newyork_df['date'] = pd.to_datetime(newyork_df['date']).dt.date

    hanoi_df['city'] = "Hanoi"
    hanoi_df['date'] = pd.to_datetime(hanoi_df['date']).dt.date

    # hcmc_df['city'] = "Ho Chi Minh City"
    # hcmc_df['date'] = pd.to_datetime(hcmc_df['date']).dt.date

    out_df = pd.concat([newyork_df,hanoi_df])
    out_df.rename(columns=lambda x: x.strip(),inplace=True)
    out_df.loc[(out_df['pm25'].notna()) & 
                      (out_df['date'] >= pd.to_datetime('2023/01/01').date()) &
                      (out_df['date'] < pd.to_datetime('2024/01/01').date()) &
                      (out_df['city'].isin(['New York', 'Hanoi']))
                     ].sort_values(['date','city']).to_csv('VietnamVsNYCpmpollution_2023.csv',index=False)