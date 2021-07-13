class Api::V0::UsersController < ApplicationController
  before_action :set_user, only [:show, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all.order(username: :asc)
    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  # GET/users/new
  def new
    @user = User.new
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.create(user_params)

    if @user.save
      render json: @user
    else
      render json: @user.errors
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy

    render json: { notice: 'User was successfully removed.' }
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:username, :password)
    end
end
