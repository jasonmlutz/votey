class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
          params[:username],
          params[:password]
        )
    if @user
      login!(@user)
      @loginValues = {
        session_token: @user.session_token,
        id: @user.id
      }
      render json: @loginValues
    else
      render json: @user.errors
    end
  end

  def destroy
    logout!
    render text: 'logout completed!'
  end
end
