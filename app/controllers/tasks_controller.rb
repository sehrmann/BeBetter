class TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    @tasks = @current_user.tasks.order("created_at")
  end

  def new
    @task = Task.new
    @periods = Task::PERIODS
    @importances = Task::IMPORTANCES
  end

  def create
    @task = Task.new(task_params)
    @task.set_value!
    @task.user = @current_user

    if @task.save
      flash[:notice] = "Task Added!"
      redirect_to tasks_path
    else
      flash[:notice] = @task.errors.full_messages.to_sentence
      @periods = Task::PERIODS
      @importances = Task::IMPORTANCES
      render :new
    end
  end

  def edit
    @task = Task.find(params[:id])
    @periods = Task::PERIODS
    @importances = Task::IMPORTANCES
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes(task_params)
    @task.set_value!

    if @task.save
      flash[:notice] = "Task Edited!"
      redirect_to tasks_path
    else
      flash[:notice] = @task.errors.full_messages.to_sentence
      @periods = Task::PERIODS
      @importances = Task::IMPORTANCES
      render :edit
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "Task Deleted!"
    redirect_to tasks_path
  end

  private

  def task_params
    params.require(:task).permit(:name, :importance, :value, :reps, :period)
  end
end
