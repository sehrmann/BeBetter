# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create!(name: "Do the dishes", value: 10, reps: 1, period: "Day")
Task.create!(name: "Read a book", value: 50, reps: 1, period: "Month")
Task.create!(name: "Go to the gym", value: 10, reps: 3.5, period: "Week")
Task.create!(name: "Wake up on time", value: 5, reps: 1, period: "Day")
Task.create!(name: "Get 8hrs of sleep", value: 5, reps: 1, period: "Day")
Task.create!(name: "10,000 steps", value: 20, reps: 1, period: "Day")
Task.create!(name: "Cook new recipe", value: 50, reps: 1, period: "Month")
