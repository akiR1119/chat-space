class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html
        format.json { render 'create', formats: 'json', handlers: 'jbuilder' }
      end
    else
      respond_to do |format|
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, :group_id).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
