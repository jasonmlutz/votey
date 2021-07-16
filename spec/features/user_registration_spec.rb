require_relative '../rails_helper'

RSpec.feature "UserRegistration", type: :feature do
  before(:all) do
    @user = create(:user)
  end
  scenario 'has a user registration form' do
    visit new_user_url
    expect(page).to have_content('Register')
  end

  feature 'registering a new user with valid inputs' do
    before(:each) do
      visit new_user_url
      fill_in 'username', with: @user.username
      fill_in 'password', with: @user.password
    end

    scenario  'user perists in the database' do
      user = User.find_by(username: @user.username)
      expect(user).to_not be nil
    end
  end
end
