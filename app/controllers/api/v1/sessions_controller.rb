class Api::V1::SessionsController < ApplicationController
  def show
    @user = User.find_by(session_token: params[:session_token])
    if @user
      render json: @user
    else
      render json: {}, status: :unprocessable_entity
    end
  end

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
    if current_user
      logout!
      render json: {message: 'logout completed!'}
    else
      render json: {message: 'no user to logout!'}, status: :unprocessable_entity
    end
  end
end
