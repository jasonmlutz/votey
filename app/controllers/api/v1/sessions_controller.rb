class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
          params[:username],
          params[:password]
        )
    if @user
      login!(@user)
      render json: @user
    else
      render json: @user.errors
    end
  end

  def destroy
    logout!
    render text: 'logout completed!'
  end
end
