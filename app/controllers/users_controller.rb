class UsersController < ApplicationController

  def index
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
