import json, os

from geojson import Feature, FeatureCollection, Point, dumps
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()

direc = os.path.dirname(os.getcwd()) +"\\data_manager\\"

collection = []
# with open(direc + "urls_res.csv", "r") as fo:
# with open(direc + "urls_poi.csv", "r") as fo:
for category in ["res", "poi"]:
	with open(direc + "urls_" + category + ".csv", "r") as fo:
		readline = "readline"
		
		for i in range(10):
		# while len(readline) > 0:
			readline = fo.readline()
			driver.get(readline)
			text_raw = driver.find_element_by_tag_name("pre").text
			text_json = json.loads(text_raw)

			try:
				subCat = text_json['subCategory']
			except KeyError:
				subCat = ""
			my_properties = {
				"name": text_json['name'],
				"address": text_json['address'], 
				"subCategory": subCat,
				"id": text_json['id'],
				"category": category,
				"num_stars": 3,
				"is_favorite": "FALSE",
			}
			my_point = Point((text_json['lng'], text_json['lat']))
			my_feature = Feature(geometry=my_point, properties=my_properties)
			collection.append(my_feature)
driver.quit()

# with open(direc + "res.geojson", "w") as fo:
with open(direc + "db.geojson", "w") as fo:
# with open(direc + "poi.geojson", "w") as fo:
	my_featureCollection = FeatureCollection(collection)
	dump = dumps(my_featureCollection, sort_keys=True)
	fo.write(dump)
