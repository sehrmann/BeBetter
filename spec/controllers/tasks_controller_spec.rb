require "rails_helper"

RSpec.describe Api::V1::TasksController, type: :controller do
  include Capybara::DSL

  before(:each) do
    login_with_facebook("basiliskSlayer")
    harry = User.find_by(name: "basiliskSlayer")
    quidditch = Task.new(
      name: "Quidditch practice",
      importance: "Very High",
      reps: 2,
      period: "Week",
      user: harry
    )
    quidditch.set_value!
    quidditch.save
    dada = Task.new(
      name: "Defense Against the Dark Arts",
      importance: "Very High",
      reps: 5,
      period: "Week",
      user: harry
    )
    dada.set_value!
    dada.save
    potions = Task.new(
      name: "Potions",
      importance: "Very Low",
      reps: 2,
      period: "Week",
      user: harry
    )
    potions.set_value!
    potions.save
  end


  describe "GET #index" do
    it "should return all a user's tasks" do
      session[:user_id] = User.find_by(name: "basiliskSlayer").id
      get :index
      json = JSON.parse(response.body)

      expect(json["tasks"].length).to eq(3)
      expect(json["tasks"][0]["name"]).to eq("Potions")
      expect(json["tasks"][0]["importance"]).to eq("Very Low")
      expect(json["tasks"][0]["reps"]).to eq(2)
      expect(json["tasks"][0]["period"]).to eq("Week")
    end
  end

  describe "POST #create" do
    it "adds an item to the user's tasks" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      post :create, params: {
        task: {
          name: "Transfiguration",
          importance: "High",
          reps: 3,
          period: "Week"
        }
      }
      transfiguration = Task.find_by(name: "Transfiguration")
      tasks = harry.tasks

      expect(tasks.length).to eq(4)
      expect(tasks.include?(transfiguration)).to be(true)
    end
  end

  describe "PUT #update" do
    it "should edit the task" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      quidditch = Task.find_by(name: "Quidditch practice")
      put :update, params: {
        id: quidditch.id,
        task: {
          reps: 3
        }
      }
      quidditch = Task.find_by(name: "Quidditch practice")

      expect(quidditch.reps).to eq(3)
      expect(quidditch.name).to eq("Quidditch practice")
      expect(quidditch.period).to eq("Week")
      expect(quidditch.importance).to eq("Very High")
      expect(quidditch.user).to eq(harry)
    end
  end

  describe "DELETE #destroy" do
    it "should delete the task" do
      potions = Task.find_by(name: "Potions")
      session[:user_id] = User.find_by(name: "basiliskSlayer").id
      delete :destroy, params: { id: potions.id }
      tasks = Task.all.map { |task| task.id }

      expect(tasks.length).to eq(2)
      expect(tasks.find { |id| id == potions.id }).to be(nil)
    end
  end

  describe "GET #importances_and_periods" do
    it "should return the importances and periods of the Task model" do
      session[:user_id] = User.find_by(name: "basiliskSlayer").id
      get :importances_and_periods
      json = JSON.parse(response.body)

      expect(json["importances"].length).to eq(6)
      expect(json["periods"].length).to eq(3)
      expect(json["importances"][0]).to eq("Very Low")
      expect(json["importances"][1]).to eq("Low")
      expect(json["importances"][2]).to eq("Medium")
      expect(json["importances"][3]).to eq("High")
      expect(json["importances"][4]).to eq("Very High")
      expect(json["importances"][5]).to eq("Custom (Advanced)")
      expect(json["periods"][0]).to eq("Day")
      expect(json["periods"][1]).to eq("Week")
      expect(json["periods"][2]).to eq("Month")
    end
  end
end
