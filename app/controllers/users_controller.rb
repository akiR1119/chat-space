class UsersController < ApplicationController

  def index
    @searched_users = User.where.not(id: current_user.id).where("name Like(?)", "%#{params[:keyword]}%")
    respond_to do |format|
      format.json { render 'index', formats: 'json', handlers: 'jbuilder' }
    end
  end

  def edit
  end

  def update
    if current_user.update(users_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def users_params
    params.require(:user).permit(:name, :email)
  end
end
