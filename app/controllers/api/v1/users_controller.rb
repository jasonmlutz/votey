class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    render json: filteredUsers
  end

  # GET /users/1
  # GET /users/1.json
  def show
    if @user
      render json: user_catalog(@user)
    else
      render json: {}
    end
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.protect("password_digest")
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy

    render json: { notice: 'User was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def filteredUsers
      User.all.map { |user| user.protect }
    end

    def set_user
      @user = User.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password)
    end

    def user_catalog(user)
      catalog = {}
      catalog[:USER] = user.protect
      catalog[:POLLS] = user.polls
      catalog[:RESPONSE_DATA] = []
      user.responses.each do |response|
        catalog[:RESPONSE_DATA].push([response, Poll.find(response.poll_id)])
      end

      return catalog
    end
end
