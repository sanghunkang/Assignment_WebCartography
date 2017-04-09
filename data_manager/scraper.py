import json, os

from geojson import Feature, FeatureCollection, Point, dumps
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()

direc = os.path.dirname(os.getcwd()) +"\\data\\"

collection = []
with open(direc + "urls_res.csv", "r") as fo:
	readline = "readline"
	for i in range(50):
	# while len(readline) > 0:
		readline = fo.readline()
		driver.get(readline)
		text_raw = driver.find_element_by_tag_name("pre").text
		text_json = json.loads(text_raw)
		my_properties = {
			"name": text_json['name'],
			"address": text_json['address'], 
			"subCategory": text_json['subCategory'],
			"id": text_json['id']
		}
		my_point = Point((text_json['lng'], text_json['lat']))
		my_feature = Feature(geometry=my_point, properties=my_properties)
		collection.append(my_feature)
driver.close()

with open(direc + "res.geojson", "w") as fo:
	my_featureCollection = FeatureCollection(collection)
	dump = dumps(my_featureCollection, sort_keys=True)
	fo.write(dump)
