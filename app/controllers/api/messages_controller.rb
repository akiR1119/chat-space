class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.json { @new_messages = Message.where("id > #{params[:id]} AND group_id = #{params[:group_id]}")}
    end
  end
end