curl -H "Content-Type: application/json" \
		 -d '{"title":"Berry", "summary":"This is a Berry", "score":10, "healthScore":10, "instructions":"Berry are natural fruits", "diets":["lacto ovo vegetarian", "vegan"]}' \
		 -X POST \
		 http://localhost:3001/recipe 

curl -H "Content-Type: application/json" \
		 -d '{"title":"Carrot", "summary":"This is a Carrot", "score":9, "healthScore":9, "instructions":"Steps for Carrot", "diets":["gluten free", "pescatarian"]}' \
		 -X POST \
		 http://localhost:3001/recipe 

