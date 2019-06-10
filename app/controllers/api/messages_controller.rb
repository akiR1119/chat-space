class Api::MessagesController < ApplicationController
  def index
    latest_id = params[:id]
    current_group = params[:group_id]
    respond_to do |format|
      format.json { @new_messages = Message.where("id > #{latest_id} AND group_id = #{current_group}")}
    end
  end
end