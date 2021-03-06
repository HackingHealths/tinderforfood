require 'nokogiri'
require 'open-uri'
require 'json'

# final results
final_data = Hash.new
category_average = Hash.new 0

# list of food to scrape
hash_food_item = [
	{"name" => "Apples", "barcode" => 2171},
	{"name" => "Bananas", "barcode" => 2208},
	{"name" => "Avocados", "barcode" => 2206},
	{"name" => "Blackberries", "barcode" => 2210},
	{"name" => "Blueberries", "barcode" => 2215},
	{"name" => "Cherries", "barcode" => 2232},
	{"name" => "Breadfruits", "barcode" => 2222},
	{"name" => "Cherimoyas", "barcode" => 2225},
	{"name" => "Crabapples", "barcode" => 2239},
	{"name" => "Cranberries", "barcode" => 2240},
	{"name" => "Apricots", "barcode" => 2289},
	{"name" => "Figs", "barcode" => 2250},
	{"name" => "Elderberries", "barcode" => 2249},
	{"name" => "Currants", "barcode" => 2244},
	{"name" => "Dates", "barcode" => 2248},
	{"name" => "Gooseberries", "barcode" => 2268},
	{"name" => "Grapefruits", "barcode" => 2275},
	{"name" => "Grapes", "barcode" => 2285},
	{"name" => "Guavas", "barcode" => 2293},
	{"name" => "Jackfruits", "barcode" => 2296},
	{"name" => "Kiwifruits", "barcode" => 2300},
	{"name" => "Limes", "barcode" => 2307},
	{"name" => "Mangos", "barcode" => 2318},
	{"name" => "Litchis", "barcode" => 2311},
	{"name" => "Longans", "barcode" => 2314},
	{"name" => "Oranges", "barcode" => 2332},
	{"name" => "Tangerines", "barcode" => 2345},
	{"name" => "Peaches", "barcode" => 2356},
	{"name" => "Papayas", "barcode" => 2350},
	{"name" => "Pears", "barcode" => 2371},
	{"name" => "Persimmons", "barcode" => 2384},
	{"name" => "Pineapples", "barcode" => 2385},
	{"name" => "Plantains", "barcode" => 2396},
	{"name" => "Raisins", "barcode" => 2416},
	{"name" => "Raspberries", "barcode" => 2419},
	{"name" => "Strawberries", "barcode" => 2430},
	{"name" => "Clementines", "barcode" => 2478}
]

hash_food_item.each do |item|
	food_barcode = item["barcode"]

	food = Hash.new

	website = "http://ndb.nal.usda.gov/ndb/foods/show/#{food_barcode}"
	doc = Nokogiri::HTML(open(website))

	nutrient = doc.xpath("//div[@class='nutlist']/table/tbody/tr[@class='odd']/td[1]")
	unit = doc.xpath("//div[@class='nutlist']/table/tbody/tr[@class='odd']/td[2]")
	value_per_hundred = doc.xpath("//div[@class='nutlist']/table/tbody/tr[@class='odd']/td[3]")

	length = value_per_hundred.count

	(0..length-1).each do |i|
		temp = Hash.new
		temp["unit"] = unit[i].text.to_s
		temp["value_per_hundred"] = value_per_hundred[i].text.to_f

		food[nutrient[i].text.to_s.gsub("\t","").gsub("\r","").gsub("\n","")] = temp

		category_average[nutrient[i].text.to_s.gsub("\t","").gsub("\r","").gsub("\n","")] += value_per_hundred[i].text.to_f
	end

	food["barcode"] = food_barcode
	final_data[item["name"]] = food
end

puts final_data.to_json

File.open("data/food.json","w") do |f|
  f.write(final_data.to_json)
end

puts "====================================="
puts "Done writing to file"

category_average.each do |item|
	category_average[item[0]] = item[1] / hash_food_item.count
end

puts category_average.to_json

File.open("data/category_average.json","w") do |f|
  f.write(category_average.to_json)
end

puts "====================================="
puts "Done computing category averages"
