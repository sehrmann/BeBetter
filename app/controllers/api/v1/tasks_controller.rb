class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @tasks = current_user.tasks
    @periods = Task::PERIODS
    @importances = Task::IMPORTANCES.map { |i| i.first }

    render json: {
      tasks: @tasks,
      periods: @periods,
      importances: @importances
    }
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    @task.set_value!
    @task.user = current_user

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

  private

  def task_params
    params.require(:task).permit(:name, :importance, :value, :reps, :period)
  end
end