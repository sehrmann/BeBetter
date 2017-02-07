class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @tasks = current_user.tasks.order("created_at DESC")
    @periods = Task::PERIODS
    @importances = Task::IMPORTANCES.map { |i| i.first }

    render json: { tasks: @tasks }
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    @task.set_value!

    @task.save
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes(task_params)
    @task.set_value!

    @task.save
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
  end

  def importances_and_periods
    @periods = Task::PERIODS
    @importances = Task::IMPORTANCES.map { |i| i.first }

    render json: {
      periods: @periods,
      importances: @importances
    }
  end

  private

  def task_params
    params.require(:task).permit(:name, :importance, :value, :reps, :period)
  end
end
