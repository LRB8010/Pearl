class PendingController < ApplicationController
  skip_before_action :logged_in?, only: [:index]
  before_action :set_pending, only: [:show, :update, :destroy]

  # GET /pending_tasks
  def index
    @pendingg = Pending.all

    render json: @pendingg, include:[:task,{volunteer:{include: :profile}},{senior:{include: :profile}}]
  end

  # GET /pending_tasks/1
  def show
    render json: @pending, include:[:task,:volunteer,:senior]
  end

  # POST /pending_tasks
  def create
    @pending = Pending.new(pending_params)

    if @pending.save
      render json: @pending, status: :created, location: @pending
    else
      render json: @pending.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pending_tasks/1
  def update
    if @pending.update(pending_params)

      render json: @pending
    else
      render json: @pending.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pending_tasks/1
  def destroy
    @pending.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pending
      @pending = Pending.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pending_params
      params.require(:pending).permit(:task_id, :senior_id, :volunteer_id)
    end
end
