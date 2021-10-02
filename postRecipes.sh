curl -H "Content-Type: application/json" -d '{"name":"Berry", "resume":"This is a Berry", "score":10, "level":10, "step":"Berry", "diet":"gluten free"}' -X POST http://localhost:3001/recipe 

curl -H "Content-Type: application/json" -d '{"name":"Carrot", "resume":"This is a Carrot", "score":9, "level":9, "step":"Steps for Carrot", "diet":"LACTO OVO VEGETARIAN"}' -X POST http://localhost:3001/recipe 

curl -H "Content-Type: application/json" -d '{"name":"Salmon", "resume":"This is a Salmon", "score":8, "level":8, "step":"Steps for Salmon", "diet":"primal"}' -X POST http://localhost:3001/recipe 
