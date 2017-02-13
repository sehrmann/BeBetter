require 'rails_helper'

feature "user authentication and authorization" do
  scenario "user signs in" do
    login_with_facebook

    expect(page).to have_content("Signed in as dumbledore")
  end

  scenario "user signs in, then signs out" do
    login_with_facebook
    click_link "Sign Out"

    expect(page).to have_content("Signed out")
    expect(page).to_not have_content("dumbledore")
  end

  scenario "user signs in, out, then in again" do
    login_with_facebook
    click_link "Sign Out"
    visit auth_path(:facebook)
    albus = User.find_by(name: "dumbledore")

    expect(page).to have_content("Signed in as dumbledore")
    expect(albus.sign_in_count).to eq(2)
  end

  scenario "user tries to visit dashboard while loggged out" do
    login_with_facebook
    albus = User.find_by(name: "dumbledore")
    click_link "Sign Out"
    visit "/users/#{albus.id}"

    expect(page).to have_content("You are not authorized to view this record.")
    expect(page).to_not have_content("Signed in as dumbledore")
  end
end
