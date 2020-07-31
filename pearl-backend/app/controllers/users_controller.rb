class UsersController < ApplicationController
  before_action :current_user, only: [:show,:update,:destroy]
  skip_before_action :logged_in?, only: [:index,:create]
  

  # GET /users
  def index
    @users = User.all

    render json: @users, include: [:tasks, :profile]
  end

  # GET /users/1
  def show
    render json: @userr, include:[:profile]
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: {error: "Failed to create user"}, status: :not_acceptable
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :password, :role)
    end
end
