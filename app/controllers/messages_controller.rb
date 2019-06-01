class MessagesController < ApplicationController

  def index
    @group = Group.find_by(params[:group_id])
  end

  def create
  end
end
