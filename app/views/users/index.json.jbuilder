json.array! @searched_users do |user|
  json.name user.name
  json.id user.id
end