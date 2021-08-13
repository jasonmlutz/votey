class Api::V1::SessionsController < ApplicationController
  before_action :set_current_user, only: [:show, :destroy]

  def show
    if @user
      render json: @user
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
          params[:username],
          params[:password]
        )
    if @user
      render json: @user.protect("password_digest")
    else
      render json: @user.errors
    end
  end

  def destroy
    if @user
      @user.reset_session_token!
      render json: {message: 'logout completed!'}
    else
      render json: {message: 'no user to logout!'}, status: :unprocessable_entity
    end
  end

  private
    def set_current_user
      @user = User.find_by(session_token: params[:session_token])
    end
end
