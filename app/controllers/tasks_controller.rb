class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      flash[:notice] = "Task Added!"
      redirect_to tasks_path
    else
      flash[:notice] = @task.errors.full_messages.to_sentence
      render :new
    end
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      flash[:notice] = "Task Edited!"
      redirect_to tasks_path
    else
      flash[:notice] = @task.errors.full_messages.to_sentence
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
