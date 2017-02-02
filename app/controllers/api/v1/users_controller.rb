class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def fetch_current_user
    render json: current_user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:current_points)
  end

  def new_user?
    current_user.tasks.length == 0
  end

  def month_over?
    user.current_month == Time.now.month
  end
end
