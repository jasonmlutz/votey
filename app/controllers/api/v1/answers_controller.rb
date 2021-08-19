class Api::V1::AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :destroy]
  # GET /answers
  # GET /answers.json
  def show
    if @answer
      render json: @answer
    else
      render json: {}
    end
  end
  
  # DELETE /answers/:answer_id
  def destroy
    if @answer && @answer.destroy
      render json: {message: "answer deleted"}
    else
      render json: {message: "unable to destroy answer"}
    end
  end

  # POST responses/:response_id/answers
  # POST responses/:response_id/answers.json
  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer
    else
      render json: @answer.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def answer_params
      params.permit(:response_id, :question_id, :response_option_id)
    end

    def set_answer
      @answer = Answer.find_by(id: params[:id])
    end
end
