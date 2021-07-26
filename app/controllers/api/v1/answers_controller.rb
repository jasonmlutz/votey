class Api::V1::AnswersController < ApplicationController
  before_action :set_answer, only: [:show]
  # GET /answers
  # GET /answers.json
  def show
    if @answer
      render json: @answer
    else
      render json: @answer.errors
    end
  end

  # POST /answers
  # POST /answers.json
  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: @answer
    else
      render json: @answer.errors.full_messages, status: :unprocessable_entity
    end
  end

  # GET /answers
  # GET /answers.json
  def index

  end

  private
    def answer_params
      params.permit(:response_id, :question_id, :response_option_id)
    end

    def set_answer
      @answer = Answer.find(params[:id])
    end
end
