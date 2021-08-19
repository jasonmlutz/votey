class Api::V1::QuestionsController < ApplicationController
  before_action :set_poll, only: [:index, :create]
  before_action :set_question, only: [:destroy]

  # GET /questions
  # GET /questions.json
  def index
    @questions = @poll.questions.order(id: :asc)
    render json: @questions
  end

  def create
    @question = Question.new(question_params)
    @question.parent_poll_id = @poll.id

    if @question.save
      render json: @question
    else
      render json: @question.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @question && @question.destroy
      render json: {message: "question object destroyed"}
    else
      render json: {message: "question object NOT destroyed"}
    end
  end

  private
    def question_params
      params.permit(:title)
    end

    def set_poll
      @poll = Poll.find(params[:poll_id])
    end

    def set_question
      @question = Question.find_by(id: params[:id])
    end
end
