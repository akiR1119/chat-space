class Api::MessagesController < ApplicationController
  def index
    latest_id = 
    @new_messages = Message.where("id > latest_id")
  end
end