class Api::MessagesController < ApplicationController
  def index
    latest_id = params[:id]
    current_group = params[:group_id]
    # binding.pry
    # @new_messages = Message.where("id > #{latest_id} AND group_id = #{current_group}")
    # @new_messages = Message.where("id > #{latest_id} AND group_id = #{current_group}")
    # render json: @new_messages
    # render @new_messages, formats: 'json', handlers: 'jbuilder'
    respond_to do |format|
      format.json { @new_messages = Message.where("id > #{latest_id} AND group_id = #{current_group}")}
    end
  end
end

# OK
# No template found for Api::MessagesController#index, rendering head :no_content
