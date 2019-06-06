json.id @message.id
json.username @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.group_id @message.group_id
json.img @message.image.filename