class InprogressesController < ApplicationController
  skip_before_action :logged_in?, only: [:index]
  before_action :set_inprogress, only: [:show, :update, :destroy]

  # GET /inprogresses
  def index
    @inprogresses = Inprogress.all

    render json: @inprogresses, include:[:task,{volunteer:{include: :profile}},{senior:{include: :profile}}]
  end

  # GET /inprogresses/1
  def show
    render json: @inprogress
  end

  # POST /inprogresses
  def create
    @inprogress = Inprogress.new(inprogress_params)

    if @inprogress.save
      render json: @inprogress, include:[:task,{volunteer:{include: :profile}},{senior:{include: :profile}}], status: :created, location: @inprogress
    else
      render json: @inprogress.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /inprogresses/1
  def update
    if @inprogress.update(inprogress_params)
      render json: @inprogress
    else
      render json: @inprogress.errors, status: :unprocessable_entity
    end
  end

  # DELETE /inprogresses/1
  def destroy
    @inprogress.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inprogress
      @inprogress = Inprogress.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def inprogress_params
      params.require(:inprogress).permit(:task_id, :volunteer_id, :senior_id)
    end
end
