# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Player.destroy_all
puts 'deleting existing players in database'

Player.create({name: 'charlie conway', wins: 10, losses: 5});
Player.create({name: 'gordon bombay', wins: 5, losses: 10});

puts 'database re-seeded with players'