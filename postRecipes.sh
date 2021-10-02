curl -H "Content-Type: application/json" \
		 -d '{"name":"Berry", "resume":"This is a Berry", "score":10, "level":10, "step":"Berry", "diet":["lacto ovo vegetarian", "vegan"]}' \
		 -X POST \
		 http://localhost:3001/recipe 

curl -H "Content-Type: application/json" \
		 -d '{"name":"Carrot", "resume":"This is a Carrot", "score":9, "level":9, "step":"Steps for Carrot", "diet":["gluten free", "pescatarian"]}' \
		 -X POST \
		 http://localhost:3001/recipe 

