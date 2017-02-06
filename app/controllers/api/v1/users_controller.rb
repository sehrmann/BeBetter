class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def fetch_current_user
    @user = current_user
    @hasTasks = @user.tasks.length > 0
    render json: {
      user: @user,
      hasTasks: @hasTasks
    }
  end

  def update_points_goal
    @user = User.find(params[:user_id])
    @user.update_points_goal!
  end

  def clear_tasks
    @user = User.find(params[:user_id])
      if @user == current_user
        @user.tasks.destroy_all
      end
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:current_points, :points_goal)
  end

  def new_user?
    current_user.tasks.length == 0
  end

  def month_over?
    user.current_month == Time.now.month
  end
end
