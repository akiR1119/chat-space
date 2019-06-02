class MessagesController < ApplicationController

  def index
    @group = Group.find_by(params[:group_id])
  end

  def create
    Message.create(create_params)
  end

  private
  def create_params
    params.require(:message).permit(:content, :image).merge{user_id: current_user.id}
  end
end
